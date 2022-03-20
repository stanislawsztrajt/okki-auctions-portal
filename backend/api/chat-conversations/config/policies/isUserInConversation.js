module.exports = async (ctx, next) => {
  let conversationCodes = []

  if(ctx.request.header.users_ids !== undefined) {
    conversationCodes = ctx.request.header.users_ids.split('+');
  } else {
    conversationCodes = ctx.request.body.users_ids.split('+');
  }

  if(conversationCodes.includes(ctx.state.user.id)){
    return await next();
  } else {
    ctx.forbidden(`You do not have access to this conversation`);
  }
};