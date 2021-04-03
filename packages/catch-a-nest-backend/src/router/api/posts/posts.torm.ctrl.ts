import { Post } from '@src/entity/Post';
import { User } from '@src/entity/User';
import { generateUrlSlug, validateBodySchema } from '@src/lib/common';
import Joi from 'joi';
import { Context } from 'koa';
import { getRepository, LessThan } from 'typeorm';

type SaveNewPostBodySchema = {
  title: string;
  body: string;
  shortDescription?: string;
  thumbnail?: string;
};

export const saveNewPost = async (ctx: Context) => {
  const bodySchema = Joi.object<SaveNewPostBodySchema>().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    shortDescription: Joi.string().allow(''),
    thumbnail: Joi.string().allow(''),
  });

  if (!(await validateBodySchema(ctx, bodySchema))) {
    return;
  }

  const currentUser = await getRepository(User).findOne({
    id: ctx.user?.id,
  });

  if (!currentUser) {
    ctx.status = 404;
    ctx.body = {
      name: 'UserNotFound',
      payload: 'Current User is not found',
    };
    return;
  }

  const {
    title,
    body,
    shortDescription,
    thumbnail,
  }: SaveNewPostBodySchema = ctx.request.body;
  try {
    let urlSlug = generateUrlSlug(title);
    const exists = await getRepository(Post).findOne({
      url_slug: urlSlug,
    });

    if (exists) {
      urlSlug = generateUrlSlug(`${title} ${Date.now()}`);
    }

    const newPost = new Post();
    newPost.title = title;
    newPost.body = body;
    newPost.short_description = shortDescription;
    newPost.thumbnail = thumbnail;
    newPost.url_slug = urlSlug;
    newPost.user = currentUser;

    await getRepository(Post).save(newPost);

    ctx.body = newPost;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getPosts = async (ctx: Context) => {
  try {
    const params = ctx.query;
    console.log(params);
    const { user_id, cursor } = params;

    const posts = await getRepository(Post).find({
      where: {
        ...(user_id ? { user: { id: user_id } } : {}),
        ...(cursor ? { id: LessThan(cursor) } : {}),
      },
      relations: ['user'],
      take: 10,
      order: {
        id: 'DESC',
      },
    });

    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};
