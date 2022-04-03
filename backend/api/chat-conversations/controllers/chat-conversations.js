'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const code = ctx.request.header.users_ids.split('+').join('');

    let entity = await strapi.query('chat-conversations').find({ code: { $eq: code } });

    return entity;
  },
  async create(ctx) {
    let data = {
      code: ctx.request.body.users_ids.split('+').join(''),
      messages: ctx.request.body.messages,
      lastSeenMessages: ctx.request.body.lastSeenMessages
    }

    let entity = await strapi.services['chat-conversations'].create(data);

    return sanitizeEntity(entity, { model: strapi.models['chat-conversations'] });
  },
  async findUserConversations(ctx) {
    let entity = await strapi.query('chat-conversations').find({ code: { $regex: ctx.state.user.id }});

    return entity;
  }
}
