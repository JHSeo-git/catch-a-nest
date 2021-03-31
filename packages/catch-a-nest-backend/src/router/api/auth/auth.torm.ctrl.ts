import { SocialAccount } from '@src/entity/SocialAccount';
import { User } from '@src/entity/User';
import { validateSchema } from '@src/lib/common';
import getGoogleProfile from '@src/lib/google/getGoogleProfile';
import Joi from 'joi';
import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';

type LoginWithGoogleBodySchema = {
  access_token: string;
};

export const loginWithGoogle = async (ctx: Context) => {
  const bodySchema = Joi.object<LoginWithGoogleBodySchema>().keys({
    access_token: Joi.string().required(),
  });

  if (!(await validateSchema(ctx, bodySchema))) {
    return;
  }

  const {
    access_token: accessToken,
  }: LoginWithGoogleBodySchema = ctx.request.body;
  try {
    const profile = await getGoogleProfile(accessToken);

    // 1. find social account if exists
    const socialAccount = await getRepository(SocialAccount).findOne(
      {
        provider: 'google',
        social_id: profile.socialId,
      },
      {
        relations: ['user'],
      }
    );

    // 2-1. not exists -> create user, socialAccount -> login
    // 2-2. exists -> login
    if (!socialAccount) {
      const user = new User();
      user.email = profile.email;
      user.display_name = profile.displayName;
      user.photo_url = profile.photo ?? undefined;

      const newSocialAccount = new SocialAccount();
      newSocialAccount.provider = 'google';
      newSocialAccount.social_id = profile.socialId;
      newSocialAccount.user = user;

      const manager = getManager();
      await manager.save([user, newSocialAccount]);

      const token = await user.generateToken();
      ctx.cookies.set('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      ctx.body = {
        user,
        access_token: token,
      };
    } else {
      const user = await getRepository(User).findOne({
        id: socialAccount.user.id,
      });

      if (!user) {
        ctx.status = 500;
        ctx.body = {
          name: 'UserNotFound',
          payload: 'User is not found Error',
        };
        return;
      }

      const token = await user.generateToken();
      ctx.cookies.set('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      ctx.body = {
        user,
        access_token: token,
      };
    }
    // make jwt
  } catch (e) {
    // console.log(e);
    // TODO: Google Error try-catch
    ctx.throw(500, e);
  }
};
