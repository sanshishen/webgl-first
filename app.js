/**
 * node 启动文件
 * @author  sanshishen
 * @date    2017-10-11 10:13:42
 * @version 1.0.0 
 */
const Koa = require('koa');
const convert = require('koa-convert');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

/* app.use(async ctx => {
  ctx.body = 'Hello World';
}); */

app.use(convert(require('koa-static')(__dirname + '/public')));

app.listen(3000);