module.exports = async (ctx, next) => {
  const lastSeenMessageEl = await strapi.query('last-seen-messages').find(
    { user_id: ctx.request.body.user_id, conversation_id: ctx.request.body.conversation_id },
  );

  if(lastSeenMessageEl.length <= 0) {
    return await next();
  } else {
    ctx.forbidden(`Access denied`);
  }
};