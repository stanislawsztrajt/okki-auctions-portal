'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
  async count(ctx) {
    return strapi.query('views-of-auctions').count({ auction_id: { $eq: ctx.request.header.auction_id } });
  },
 };

