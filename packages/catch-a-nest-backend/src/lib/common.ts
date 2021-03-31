import Joi from 'joi';
import { Context } from 'koa';

export const validateSchema = async (ctx: Context, schema: Joi.Schema) => {
  const result = await schema.validateAsync(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WrongSchema',
      payload: result.error,
    };
    return false;
  }
  return true;
};

export const generateUrlSlug = (text: string) => {
  // 한글 unicode: /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g
  // default regex : /[0-9a-zA-Z. -]/g
  const invalidCharRegex = /[^0-9a-zA-Z.\u3131-\u314e\u314f-\u3163\uac00-\ud7a3 -]/g;
  return text
    .replace(invalidCharRegex, '')
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};
