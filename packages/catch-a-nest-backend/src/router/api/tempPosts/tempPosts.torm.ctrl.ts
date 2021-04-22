import { Post } from '@src/entity/Post';
import { Context } from 'koa';
import { getRepository, LessThan } from 'typeorm';

export const getTempPosts = async (ctx: Context) => {
  try {
    const params = ctx.query;
    const { user_id, cursor } = params;

    const posts = await getRepository(Post).find({
      where: {
        ...(user_id ? { user: { id: user_id } } : {}),
        ...(cursor ? { id: LessThan(cursor) } : {}),
        is_temp: true,
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
