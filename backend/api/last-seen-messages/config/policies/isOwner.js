module.exports = async (ctx, next) => {
  const { id } = ctx.params;
  const entity = await strapi.query('last-seen-messages').find({ id })

  if(entity[0].user_id === ctx.state.user.id){
    return await next();
  } else {
    ctx.forbidden(`Access denied`);
  }
};