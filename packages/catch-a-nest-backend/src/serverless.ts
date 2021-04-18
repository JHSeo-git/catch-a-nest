import serverless, { Handler } from 'serverless-http';
import app from './app';

const slsApp = serverless(app);

export const handler: Handler = async (event, context) => {
  const result = await slsApp(event, context);
  return result;
};
