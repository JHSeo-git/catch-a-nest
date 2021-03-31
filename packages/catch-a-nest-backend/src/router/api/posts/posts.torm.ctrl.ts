import { Post } from '@src/entity/Post';
import { User } from '@src/entity/User';
import { generateUrlSlug, validateSchema } from '@src/lib/common';
import Joi from 'joi';
import { Context } from 'koa';
import { getRepository } from 'typeorm';

type SavePostBodySchema = {
  title: string;
  body: string;
};

export const savePost = async (ctx: Context) => {
  const bodySchema = Joi.object<SavePostBodySchema>().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
  });

  if (!(await validateSchema(ctx, bodySchema))) {
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

  const { title, body }: SavePostBodySchema = ctx.request.body;
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
    newPost.url_slug = urlSlug;
    newPost.user = currentUser;

    await getRepository(Post).save(newPost);

    ctx.body = {
      post: newPost,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};
