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
