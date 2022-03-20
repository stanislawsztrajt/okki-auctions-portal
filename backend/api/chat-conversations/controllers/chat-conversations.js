'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const conversationCode = ctx.request.header.users_ids.split('+').join('');

    let entity = await strapi.query('chat-conversations').find({ conversationCode: { $eq: conversationCode } });

    return entity;
  },
  async create(ctx) {
    let data = {
      conversationCode: ctx.request.body.users_ids.split('+').join(''),
      conversationMessages: []
    }

    let entity = await strapi.services['chat-conversations'].create(data);

    return sanitizeEntity(entity, { model: strapi.models['chat-conversations'] });
  },
  async findUserConversations(ctx) {
    let entity = await strapi.query('chat-conversations').find({ conversationCode: { $regex: ctx.state.user.id }});

    return entity;
  }
}
