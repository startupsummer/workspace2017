const config = require('web/config');
const path = require('path');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const views = require('koa-views');
const routes = require('./routes');
const logger = require('koa-logger');
const handlebars = require('handlebars');
const serve = require('koa-static');
const { devMiddleware } = require('web/koa-webpack-middleware-master/middleware');
const webpack = require('webpack');
const webpackConfig = require('web/webpack.config.js');
const validator = require('koa-validator');
const body = require('koa-body');


handlebars.registerHelper('json', context => JSON.stringify(context));

module.exports = (app) => {
  app.use(serve(path.join(__dirname, './../../client')));
  app.use(devMiddleware(webpack(webpackConfig)));

  app.use(views(path.join(__dirname, './../../client'), {
    default: 'html',
    map: { html: 'handlebars' },
  }));

  app.use(body());

  app.use(validator());

  app.use(session({
    store: redisStore({
      host: config.redis.host,
      port: config.redis.port,
    }),
    ttl: 3600 * 10000,
    cookie: {
      expires: false,
    },
  }));

  app.use(logger());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err);
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.use(routes);
};
