import Koa from 'koa';
const app = new Koa();

// response
app.use((ctx) => {
  ctx.body = {
    text: 'hello koa',
    message: process.env.MESSAGE,
  };
});

app.listen(parseInt(process.env.PORT ?? '8081', 10));
