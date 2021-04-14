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

  const {
    title,
    body,
    shortDescription,
    thumbnail,
  }: SaveNewPostBodySchema = ctx.request.body;
  try {
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

export const updatePost = async (ctx: Context) => {
  const bodySchema = Joi.object<SaveNewPostBodySchema>().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    shortDescription: Joi.string().allow(''),
    thumbnail: Joi.string().allow(''),
  });

  if (!(await validateBodySchema(ctx, bodySchema))) {
    return;
  }

  const {
    title,
    body,
    shortDescription,
    thumbnail,
  }: SaveNewPostBodySchema = ctx.request.body;
  try {
    const params = ctx.params;
    const { slug } = params;

    const post = await getRepository(Post).findOne({
      url_slug: slug,
    });

    if (!post) {
      ctx.status = 404;
      ctx.body = {
        name: 'PostNotFound',
        payload: 'Update Post is not found',
      };
      return;
    }

    post.title = title;
    post.body = body;
    post.short_description = shortDescription;
    post.thumbnail = thumbnail;

    await getRepository(Post).save(post);

    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getPosts = async (ctx: Context) => {
  try {
    const params = ctx.query;
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

export const getPostBySlug = async (ctx: Context) => {
  try {
    const params = ctx.params;
    const { slug } = params;

    if (!slug) {
      ctx.status = 404;
      ctx.body = {
        name: 'NotFoundSlug',
        payload: 'It not Found url slug in request',
      };
      return;
    }

    const post = await getRepository(Post).findOne({
      url_slug: slug,
    });

    if (!post) {
      ctx.status = 404;
      ctx.body = {
        name: 'NotFoundPost',
        payload: 'It not Found Post by slug',
      };
      return;
    }

    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const deletePostBySlug = async (ctx: Context) => {
  try {
    const params = ctx.params;
    const { slug } = params;

    if (!slug) {
      ctx.status = 404;
      ctx.body = {
        name: 'NotFoundSlug',
        payload: 'It not Found url slug in request',
      };
      return;
    }

    const postRepository = getRepository(Post);
    const post = await postRepository.findOne({
      url_slug: slug,
    });

    if (!post) {
      ctx.status = 404;
      ctx.body = {
        name: 'NotFoundPost',
        payload: 'It not Found Post by slug',
      };
      return;
    }

    const removed = await postRepository.remove(post);

    if (!removed) {
      ctx.status = 500;
      ctx.body = {
        name: 'FailedDeletePost',
        payload: 'Failed delte a Post by slug',
      };
      return;
    }

    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
