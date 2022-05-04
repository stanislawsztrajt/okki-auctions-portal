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
      accucuracyRate = 'Brak opinii użytkowników'
    }

    const comments = entity.sort((commentA,commentB) => new Date(commentB.published_at) - new Date(commentA.published_at) ? -1 : 1)

    return sanitizeEntity({
      accucuracyRate,
      comments
    }, { model: strapi.models.comment });
  },
  async findFirstSixCommentsInUsersProfiles(ctx){
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
      accucuracyRate = 'Brak opinii użytkowników'
    }

    const comments = entity .sort((commentA,commentB) => new Date(commentB.published_at) - new Date(commentA.published_at) ? -1 : 1)
                            .slice(0, 6);

    return sanitizeEntity({
      accucuracyRate,
      comments
    }, { model: strapi.models.comment });
  },
  async findHiddenComments(ctx) {
    let result = await strapi.query('comment').model.find({ published_at: { $eq: null } });

    let comments = sanitizeEntity(result, {
      model: strapi.models['comment'],
    });

    ctx.send(comments);
  },
  async countHiddenComments(ctx) {
    let result = await strapi.query('comment').model.find({ published_at: { $eq: null } });

    let comments = sanitizeEntity(result, {
      model: strapi.models['comment'],
    });

    ctx.send(comments.length);
  },
  async create(ctx) {
    let entity;

    const comments = await strapi.services.comment.find();

    ctx.request.body.user_id = ctx.state.user.id

    const isCommentExist = comments.findIndex(
      comment =>
        comment.user_profile_id === ctx.request.body.user_profile_id &&
        (
          comment.user_id === ctx.state.user.id
        ||
          comment.user_ip === ctx.request.body.user_ip
        ||
          comment.user_profile_id === ctx.request.body.user_id
        )
    )

    if(isCommentExist > -1){
      throw strapi.errors.badRequest('Your comment already exist');
    } else{
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.comment.create(data, { files });
      } else {
        entity = await strapi.services.comment.create(ctx.request.body);
      }
    }

    return sanitizeEntity(entity, { model: strapi.models['comment-report'] });
  },
  async publishComment(ctx){
    const { id } = ctx.params;

    const entity = await strapi.services.comment.update({ id }, { published_at: new Date() })

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    if(ctx.state.user.role.name === 'Admin'){
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.comment.update({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.comment.update({ id }, ctx.request.body);
      }
    } else{
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
    }

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    if(ctx.state.user.role.name === 'Admin'){
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.comment.delete({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.comment.delete({ id }, ctx.request.body);
      }
    } else{
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
    }

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
};
