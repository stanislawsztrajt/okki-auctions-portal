'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findCommentsInUsersProfiles(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services.comment.find({ user_profile_id: id });
    
    let positiveRate = 0;
    entity.forEach(comment =>{
      if(comment.rate === true){
        positiveRate++
      }
    })

    let accucuracyRate = 0;

    if(entity.length > 0){
      accucuracyRate = Math.round(positiveRate/entity.length*100);
    } else{
      accucuracyRate = 'Brak opini użytkowników'
    }

    return sanitizeEntity({
      accucuracyRate,
      comments: entity
    }, { model: strapi.models.comment });
  },
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [comment] = await strapi.services.comment.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!comment) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.comment.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [comment] = await strapi.services.comment.find({
      id: ctx.params.id,
      'user_id': ctx.state.user.id,
    });

    if (!comment) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.comment.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
};
