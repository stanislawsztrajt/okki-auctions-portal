module.exports = async (ctx, next) => {
  const views = await strapi.query('views-of-auctions').find();

  const isViewExists = views.findIndex(view => view.auction_id === ctx.request.body.auction_id && view.user_id === ctx.request.body.user_id)

  if(isViewExists > -1){
    ctx.forbidden(`You already have a view in this auction`);
  } else {
    return await next();
  }
};