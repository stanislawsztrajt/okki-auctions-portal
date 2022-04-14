'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

const { additionalTimeToDelete } = require("../../../constants.js");
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require("../../../constants.js");
const streets = require('../../../json_files/streets.json')
const streetsWithoutPLchars = require('../../../json_files/streetsWithoutPLchars.json')

const cloudinary = require('cloudinary').v2;

// Change cloud name, API Key, and API Secret below

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const deleteAuctionImages = async (imagesPublic_id) =>{
  await imagesPublic_id.forEach(async public_id =>{
    await cloudinary.uploader.destroy(public_id, function(result) { console.log(result) });
  })
}

module.exports = {
  async find() {
    const auctions = await strapi.services.auction.find();

    auctions.map(async auction =>{
      // deleting auction after additionalTimeToDelete
      if(Date.parse(auction.published_at) + additionalTimeToDelete <= Date.parse(auction.published_at) + (Date.parse(new Date()) - Date.parse(auction.published_at))){
        deleteAuctionImages(auction.imagesPublic_id);
        await strapi.services.auction.delete({ id: auction.id });
      }
    })

    return sanitizeEntity(auctions, { model: strapi.models.auction });
  },
  async findUserAuctions(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services.auction.find({ user_id: id })

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async renewAuctions(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services.auction.update({ id }, { published_at: new Date() })

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async deleteUserAuctions(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services.auction.delete({ user_id: id })

    entity.forEach(auction =>{
      deleteAuctionImages(auction.imagesPublic_id);
    })

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async findHiddenAuctions(ctx) {
    let result = await strapi.query('auction').model.find({ published_at: { $eq: null } });

    let auctions = sanitizeEntity(result, {
      model: strapi.models['auction'],
    });

    ctx.send(auctions);
  },
  async countHiddenAuctions(ctx) {
    let result = await strapi.query('auction').model.find({ published_at: { $eq: null } });

    let auctions = sanitizeEntity(result, {
      model: strapi.models['auction'],
    });

    ctx.send(auctions.length);
  },
  async publishAuction(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services.auction.update({ id }, { published_at: new Date() })

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const isStreetExist = streets
      .findIndex(street => street == ctx.request.body.location.toLowerCase())

    const isStreetWithoutPLcharsExist = streetsWithoutPLchars
      .findIndex(street => street == ctx.request.body.location.toLowerCase())

    if(isStreetExist === -1 && isStreetWithoutPLcharsExist === -1){
      throw strapi.errors.badRequest('this street does not exist in kalisz');
    }

    if(ctx.state.user.role.name === 'Admin') {
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.auction.update({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.auction.update({ id }, ctx.request.body);
      }
    } else {
      const [auction] = await strapi.services.auction.find({
        id: ctx.params.id,
        'user_id': ctx.state.user.id,
      });

      if (!auction) {
        return ctx.unauthorized(`You can't update this entry`);
      }

      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.auction.update({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.auction.update({ id }, ctx.request.body);
      }
    }

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [auction] = await strapi.services.auction.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!auction) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if(ctx.state.user.role.name === 'Admin'){
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.auction.delete({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.auction.delete({ id }, ctx.request.body);
      }
    } else{
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.auction.delete({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.auction.delete({ id }, ctx.request.body);
      }
    }

    deleteAuctionImages(entity.imagesPublic_id);

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async create(ctx) {
    const isStreetExist = streets
      .findIndex(street => street == ctx.request.body.location.toLowerCase())

    const isStreetWithoutPLcharsExist = streetsWithoutPLchars
      .findIndex(street => street == ctx.request.body.location.toLowerCase())

    if(isStreetExist === -1 && isStreetWithoutPLcharsExist === -1){
      throw strapi.errors.badRequest('this street does not exist in kalisz');
    }

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.auction.create(data, { files });
    } else {
      entity = await strapi.services.auction.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
};