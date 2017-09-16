const config = require('web/config');
const path = require('path');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const routes = require('./routes');
const logger = require('koa-logger');
const views = require('koa-views');
const webpack = require('webpack');
const webpackConfig = require('web/webpack.config');
const { devMiddleware } = require('web/koa-webpack-middleware/middleware');
const serve = require('koa-static');
const handlebars = require('handlebars');
const compile = webpack(webpackConfig);
const koaBody = require('koa-body');
const validator = require('koa-validator');

module.exports = (app) => {
  app.use(koaBody());

  app.use(validator());

  app.use(serve(path.join(__dirname, './../../client')));

  app.use(devMiddleware(compile));

  app.use(logger());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err);
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
  });

  app.use(routes);
};
