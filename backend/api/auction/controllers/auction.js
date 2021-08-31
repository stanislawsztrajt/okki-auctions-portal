'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [auction] = await strapi.services.auction.find({
      id: ctx.params.id,
      'userID': ctx.state.user.id,
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

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [auction] = await strapi.services.auction.find({
      id: ctx.params.id,
      'userID': ctx.state.user.id,
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

    return sanitizeEntity(entity, { model: strapi.models.auction });
  },
  async find(ctx) {
    const auctions = await strapi.services.auction.find();

    auctions.map(async auction =>{
      // 2592000000 = 1 month
      if(Date.parse(auction.createdAt) <= Date.parse(auction.createdAt) + (Date.parse(new Date()) - Date.parse(auction.createdAt))){
        const entity = await strapi.services.auction.delete({ id: auction.id });
        return sanitizeEntity(entity, { model: strapi.models.auction });
      }
    })

    return sanitizeEntity(auctions, { model: strapi.models.auction });
  },
};
