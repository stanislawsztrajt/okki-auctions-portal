module.exports = async (ctx, next) => {
  let usersIds = []

  if(ctx.request.header.users_ids !== undefined) {
    usersIds = ctx.request.header.users_ids.split('+');
  } else {
    usersIds = ctx.request.body.users_ids.split('+');
  }

  if(usersIds[0] !== usersIds[1]){
    return await next();
  } else {
    ctx.forbidden(`You can't make operations at conversation with yourself`);
  }
};