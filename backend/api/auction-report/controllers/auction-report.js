'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findReportedAuctions() {
    const entity = await strapi.services['auction-report'].find();

    const ids = [];

    entity.forEach(report =>{
      ids.push(report.auction_id)
    })

    const auctions = await strapi.services.auction.find({ id: { $in: ids } });

    return sanitizeEntity(auctions, { model: strapi.models['auction-report'] });
  },
  async countReportedAuctions(){
    const entity = await strapi.services['auction-report'].find();

    let ids = [];

    entity.forEach(report =>{
      ids.push(report.auction_id)
    })

    const auctions = await strapi.services.auction.find({ id: { $in: ids } });

    return sanitizeEntity(auctions.length, { model: strapi.models['auction-report'] });
  },
  async deleteReportedAuctions(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services['auction-report'].delete({ auction_id: id })

    return sanitizeEntity(entity, { model: strapi.models['auction-report'] });
  },
  async create(ctx) {
    let entity;
    const reports = await strapi.services['auction-report'].find();

    ctx.request.body.user_id = ctx.state.user.id

    const isReportExist = reports.findIndex(
      report =>
        report.auction_id === ctx.request.body.auction_id &&
        (
          report.user_id === ctx.state.user.id
        ||
          report.user_ip === ctx.request.body.user_ip
        )
    )

    if(isReportExist > -1){
      throw strapi.errors.badRequest('Your report already exist');
    } else{
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services['auction-report'].create(data, { files });
      } else {
        entity = await strapi.services['auction-report'].create(ctx.request.body);

        let counts = {};

        // coutning how many reports at auction exists
        for (const report of reports) {
          counts[report.auction_id] = counts[report.auction_id] ? counts[report.auction_id] + 1 : 1;
        }

        console.log(reports)

        const keys = Object.keys(counts);
        Object.values(counts).forEach((value, index) =>{
          // equal 2 because if "value" is greater than 2 then every time
          // the request is sent and this is not needed
          // 2 is the number of minimum number of reports to hide auction
          if(value >= 2){
            strapi.services.auction.update({ id: keys[index]}, { published_at: null })
          }
        })
      }
    }

    return sanitizeEntity(entity, { model: strapi.models['auction-report'] });
  },
};