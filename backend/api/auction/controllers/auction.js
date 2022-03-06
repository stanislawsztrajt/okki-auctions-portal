'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find() {
    const auctions = await strapi.services.auction.find();

    auctions.map(async auction =>{
      // 2592000000 = 1 month
      if(Date.parse(auction.createdAt) + 2592000000 <= Date.parse(auction.createdAt) + (Date.parse(new Date()) - Date.parse(auction.createdAt))){
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
  async deleteUserAuctions(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services.auction.delete({ user_id: id })

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

    if(ctx.state.user.role.name === 'Admin'){
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.auction.update({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.auction.update({ id }, ctx.request.body);
      }
    } else{
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

      if (!auction) {
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

    return sanitizeEntity(entity, { model: strapi.models.auction });
  }
};
