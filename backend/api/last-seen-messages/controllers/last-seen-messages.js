'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entity = await strapi.query('last-seen-messages').find({
        user_id: ctx.state.user.id,
        conversation_id: ctx.request.headers.conversation_id
      }
    );

    return entity;
  },
};
