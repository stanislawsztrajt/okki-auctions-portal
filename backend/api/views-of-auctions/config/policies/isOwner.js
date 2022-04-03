module.exports = async (ctx, next) => {
  const auction = await strapi.query('auction').find({ id: { $eq: ctx.request.body.auction_id } });

  if(ctx.state.user.id !== auction[0].user_id){
    return await next();
  } else {
    ctx.forbidden(`Access denied`);
  }
};