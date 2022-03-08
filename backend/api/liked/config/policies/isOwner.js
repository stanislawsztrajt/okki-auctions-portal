module.exports = async (ctx, next) => {
  const auction = await strapi.query('auction').find({ id: ctx.headers.auction_id });

  if(auction[0].user_id === ctx.headers.user_id){
    return await next();
  } else {
    ctx.forbidden(`Access denied`);
  }
};