'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findReportedComments(){
    const entity = await strapi.services['comment-report'].find();

    let ids = [];

    entity.forEach(report =>{
      ids.push(report.comment_id)
    })

    const comments = await strapi.services.comment.find({ id: { $in: ids } });

    return sanitizeEntity(comments, { model: strapi.models.comment });
  },
  async countReportedComments(){
    const entity = await strapi.services['comment-report'].find();

    let ids = [];

    entity.forEach(report =>{
      ids.push(report.comment_id)
    })

    const comments = await strapi.services.comment.find({ id: { $in: ids } });

    return sanitizeEntity(comments.length, { model: strapi.models['comment-report'] });
  },
  async deleteReportedComments(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services['comment-report'].delete({ comment_id: id })

    return sanitizeEntity(entity, { model: strapi.models['comment-report'] });
  },
  async create(ctx) {
    let entity;
    const reports = await strapi.services['comment-report'].find();

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
        entity = await strapi.services['comment-report'].create(data, { files });
      } else {
        entity = await strapi.services['comment-report'].create(ctx.request.body);

        let counts = {};

        // coutning how many reports at comment exists
        for (const num of reports) {
          counts[num.comment_id] = counts[num.comment_id] ? counts[num.comment_id] + 1 : 1;
        }

        const keys = Object.keys(counts);

        Object.values(counts).forEach((value, index) =>{
          // 2 is the number of minimum number of reports to hide comment
          if(value >= 2){
            strapi.services.comment.update({ id: keys[index]}, { published_at: null } );
          }
        })
      }
    }

    return sanitizeEntity(entity, { model: strapi.models['comment-report'] });
  },
};