const config = require('../../config');
const path = require('path');

const handlebars = require('handlebars');

const koaBody = require('koa-body');

handlebars.registerHelper('json', context => JSON.stringify(context));


module.exports = (app) => {
  app.use(koaBody());

  app.use(async (ctx, next) => {
    try {
      ctx.body = 'Hello world!';
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

};
