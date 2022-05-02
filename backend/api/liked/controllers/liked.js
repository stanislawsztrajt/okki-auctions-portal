'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async count(ctx) {
    return strapi.services.liked.count({ auction_id: { $eq: ctx.request.header.auction_id } });
  },
  async find(ctx) {
    let entity;

    entity = await strapi.services.liked.find({ user_id: { $eq: ctx.request.header.user_id } });

    return sanitizeEntity(entity, { model: strapi.models.liked });
  },
  async findUserLikedAuctions(ctx){
    const { id } = ctx.params;

    const likeds = await strapi.services.liked.find({
      user_id: { $eq: id }
    });
    const likeds_id = [];

    likeds.forEach(el =>{
      likeds_id.push(el.auction_id)
    })

    const auctions = await strapi.services.auction.find({
      id: { $in: likeds_id }
    });

    return sanitizeEntity(auctions, { model: strapi.models.liked })
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [liked] = await strapi.services.liked.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!liked) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.liked.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.liked.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.liked });
  },
};