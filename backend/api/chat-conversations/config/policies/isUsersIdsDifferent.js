module.exports = async (ctx, next) => {
  let conversationCodes = []

  if(ctx.request.header.users_ids !== undefined) {
    conversationCodes = ctx.request.header.users_ids.split('+');
  } else {
    conversationCodes = ctx.request.body.users_ids.split('+');
  }

  if(conversationCodes[0] !== conversationCodes[1]){
    return await next();
  } else {
    ctx.forbidden(`You can't make operations at conversation with yourself`);
  }
};