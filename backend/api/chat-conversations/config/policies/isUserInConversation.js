module.exports = async (ctx, next) => {
  let usersIds = []

  if(ctx.request.header.users_ids !== undefined) {
    usersIds = ctx.request.header.users_ids.split('+');
  } else {
    usersIds = ctx.request.body.users_ids.split('+');
  }

  if(usersIds.includes(ctx.state.user.id)){
    return await next();
  } else {
    ctx.forbidden(`You do not have access to this conversation`);
  }
};