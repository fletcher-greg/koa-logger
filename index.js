const Koa = require("koa");
const app = new Koa();
const logger = require("./logger");

app.use(logger);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const milisecond = Date.now() - start;
  ctx.set("X-Response-Time", `${milisecond}ms`);
});
app.use(async ctx => (ctx.body = `Hello World`));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
