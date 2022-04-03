module.exports = async (ctx, next) => {
  const messages = ctx.request.body.messages;
  const senderId = messages[messages.length-1].sender_id;

  if(senderId === ctx.state.user.id){
    return await next();
  } else {
    ctx.forbidden(`You can't send message as other user`);
  }
};