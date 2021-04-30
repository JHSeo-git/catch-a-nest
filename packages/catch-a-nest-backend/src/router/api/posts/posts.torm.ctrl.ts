import { Post } from '@src/entity/Post';
import { PostRead } from '@src/entity/PostRead';
import { TempPost } from '@src/entity/TempPost';
import { User } from '@src/entity/User';
import { generateUrlSlug, validateBodySchema } from '@src/lib/common';
import Joi, { equal } from 'joi';
import { Context } from 'koa';
import { getManager, getRepository, LessThan } from 'typeorm';
import crypto from 'crypto';

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
    newPost.is_temp = false;

    const savedPost = await getRepository(Post).save(newPost);

    ctx.body = savedPost;
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
    post.is_temp = false;

    const manager = getManager();
    const savedPost = await manager.save(post);

    const tempPosts = await getRepository(TempPost).find({
      post: {
        id: post.id,
      },
    });

    if (tempPosts && tempPosts.length > 0) {
      await manager.remove(tempPosts);
    }

    ctx.body = savedPost;
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
        is_temp: false,
      },
      relations: ['user'],
      take: 10,
      order: {
        id: 'DESC',
      },
    });

    // REMOVE: post page에서만 보여주도록 함
    // const postsWithCount = await Promise.all(
    //   posts.map(async (post) => {
    //     const postCountArr = await getRepository(PostRead)
    //       .createQueryBuilder('post_reads')
    //       .select('post_reads.ip_hash')
    //       .where(`post_reads.post.id = ${post.id}`)
    //       .groupBy('post_reads.ip_hash')
    //       .getRawMany();
    //     return {
    //       ...post,
    //       read_count: postCountArr.length,
    //     };
    //   })
    // );

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

    const postReadRepo = getRepository(PostRead);

    const ipAddr = ctx.ipAddr;
    if (ipAddr) {
      const postRead = new PostRead();
      postRead.ip_hash = crypto.createHash('md5').update(ipAddr).digest('hex');
      postRead.post = post;
      await postReadRepo.save(postRead);
    }

    const postCountArr = await getRepository(PostRead)
      .createQueryBuilder('post_reads')
      .select('post_reads.ip_hash')
      .where(`post_reads.post.id = ${post.id}`)
      .groupBy('post_reads.ip_hash')
      .getRawMany();

    ctx.body = {
      ...post,
      read_count: postCountArr.length,
    };
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
