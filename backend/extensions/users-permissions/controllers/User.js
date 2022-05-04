const _ = require('lodash');
const { sanitizeEntity } = require('strapi-utils');

const auctionFunctions = require('../../../api/auction/controllers/auction')

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

const formatError = error =>{
  { messages: [{id: error.id, message: error.message, field: error.field}] }
}

module.exports = {
  async blockUser(ctx){
    const { id } = ctx.params;

    await strapi.services.comment.delete({ user_profile_id: id });
    await strapi.services.comment.delete({ user_id: id });
    // await strapi.services.auction.delete({ user_id: id })
    auctionFunctions.deleteUserAuctions(ctx)
    await strapi.services['auction-report'].delete({ user_id: id })
    await strapi.services['comment-report'].delete({ user_id: id })
    await strapi.services['last-seen-messages'].delete({ user_id: id })
    await strapi.services.liked.delete({ user_id: id })

    return sanitizeEntity({ message: "successful, user blocked" }, { model: strapi.models.comment });
  },
  async deleteMe(ctx){
    const { id } = ctx.params;

    if(id !== ctx.state.user.id){
      return ctx.unauthorized(`You can't delete this account`);
    }

    await strapi.services.comment.delete({ user_profile_id: id });
    await strapi.services.comment.delete({ user_id: id });
    // await strapi.services.auction.delete({ user_id: id })
    auctionFunctions.deleteUserAuctions(ctx)
    await strapi.services['auction-report'].delete({ user_id: id })
    await strapi.services['comment-report'].delete({ user_id: id })
    await strapi.services['last-seen-messages'].delete({ user_id: id })
    await strapi.services.liked.delete({ user_id: id })
    strapi.query('user', 'users-permissions').delete({ id })

    return sanitizeEntity({ message: "successful, account deleted" }, { model: strapi.models.comment });
  },
  async updateMe(ctx){
    const advancedConfigs = await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced',
      })
      .get();

    const { id } = ctx.state.user;
    const { email, username, password } = ctx.request.body;

    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    if (_.has(ctx.request.body, 'email') && !email) {
      return ctx.badRequest('email.notNull');
    }

    if (_.has(ctx.request.body, 'username') && !username) {
      return ctx.badRequest('username.notNull');
    }

    if (_.has(ctx.request.body, 'password') && !password && user.provider === 'local') {
      return ctx.badRequest('password.notNull');
    }

    if (_.has(ctx.request.body, 'username')) {
      const userWithSameUsername = await strapi
      .query('user', 'users-permissions')
      .findOne({ username });

      if (userWithSameUsername && userWithSameUsername.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.username.taken',
            message: 'username.alreadyTaken',
            field: ['username'],
          })
        );
      }
    }

    if (_.has(ctx.request.body, 'email') && advancedConfigs.unique_email) {
      const userWithSameEmail = await strapi.query('user', 'users-permissions').findOne({ email });

      if (userWithSameEmail && userWithSameEmail.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.email.taken',
            message: 'Email already taken',
            field: ['email'],
          })
        );
      }
    }

    let updateData = {
      ...ctx.request.body,
    }

    if (_.has(ctx.request.body, 'password') && password === user.password) {
      delete updateData.password;
    }

    const data = await strapi.plugins['users-permissions'].services.user.edit({ id }, updateData);

    ctx.send(data)
  }
}