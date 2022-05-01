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
  imagesPublic_id.forEach(async public_id =>{
    await cloudinary.uploader.destroy(public_id, function(result) { console.log(result) });
  })
};

const auctionValidation = async (ctx) =>{
  const auction = ctx.request.body;

  const isStreetExist = streets
    .findIndex(street => street == ctx.request.body.location.toLowerCase())

  const isStreetWithoutPLcharsExist = streetsWithoutPLchars
    .findIndex(street => street == ctx.request.body.location.toLowerCase())

  if(isStreetExist === -1 && isStreetWithoutPLcharsExist === -1){
    return ctx.response.badRequest('This street does not exist in kalisz');
  }

  if(auction.images.length > 3){
    return ctx.response.badRequest('Images array is too long. (4 max)');
  }
  if(!Array.isArray(auction.images)){
    return ctx.response.badRequest('Images must be an array.');
  }
  await auction.images.forEach(image =>{
    if(image.length > 200){
      return ctx.response.badRequest('Image must be shorter than 200 chars.');
    }

    if(typeof(image) !== 'string'){
      return ctx.response.badRequest('Image must be a string.');
    }
  })

  if(auction.imagesPublic_id.length > 3){
    return ctx.response.badRequest('Images public id array is too long. (4 max)');
  }
  if(!Array.isArray(auction.imagesPublic_id)){
    return ctx.response.badRequest('Images public id must be an array.');
  } 
  await auction.imagesPublic_id.forEach(imagePublicId =>{
    if(imagePublicId.length > 100){
      return ctx.response.badRequest('Image must be shorter than 100 chars.');
    }

    if(typeof(imagePublicId) !== 'string'){
      return ctx.response.badRequest('Image must be a string.');
    }
  })

  let filtersLength = 0;

  Object.values(auction.filters)
        .concat(Object.keys(auction.filters))
        .forEach(text =>{
          filtersLength += text.length
        })
  if(filtersLength > 600){
    return ctx.response.badRequest('Filters keys and values must be shorter than 600.');
  }
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

    const entity = await strapi.services.auction.find({ user_id: id });

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async findFirstSixUserAuctions(ctx){
    const { id } = ctx.params;

    //idk why .limit() isn't working
    const auctions = await strapi.services.auction.find({ user_id: id });
    const entity = auctions.splice(0, 6);

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
  async deleteAuctionImage(ctx){
    const { auction_id, id } = ctx.params;
    
    const [auction] = await strapi.services.auction.find({
      'id': auction_id,
      'user_id': ctx.state.user.id,
    });

    if (!auction) {
      return ctx.unauthorized(`You can't delete this image`);
    }

    await cloudinary.uploader.destroy(id, function(result) { console.log(result) });
    
    return sanitizeEntity('Successful image has been deleted', { model: strapi.models.auction });
  },
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    auctionValidation(ctx);

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
      const [auction] = await strapi.services.auction.find({
        id: ctx.params.id,
        'user_id': ctx.state.user.id,
      });
  
      if (!auction ) {
        return ctx.unauthorized(`You can't delete this entry`);
      }

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
    auctionValidation(ctx);

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