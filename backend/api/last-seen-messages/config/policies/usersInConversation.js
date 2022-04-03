module.exports = async (ctx, next) => {
  const conversation = await strapi.query('chat-conversations').find({ id: ctx.request.body.conversation_id });
  const requestSenderId = ctx.state.user.id
  const requestBodyUserId = ctx.request.body.user_id

  if(requestSenderId === requestBodyUserId) {
    if(conversation[0].code.includes(requestSenderId)) {
      return await next();
    } else {
      ctx.forbidden(`Access denied`);
    }
  } else {
    const conversationCode = [requestSenderId, requestBodyUserId].sort().join('')

    if(conversation[0].code === conversationCode) {
      return await next();
    } else {
      ctx.forbidden(`Access denied`);
    }
  }
};