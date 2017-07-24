const config = require('web/config');
const path = require('path');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const views = require('koa-views');
const routes = require('./routes');
const logger = require('koa-logger');
const handlebars = require('handlebars');

const webpack = require('webpack');
const {devMiddleware, hotMiddleware} = require('web/koa-webpack-middleware-master/middleware');
const webpackConfig = require("web/webpack.config.js");
const compile = webpack(webpackConfig);
const serve = require('koa-static');

const koaValidator = require ('koa-async-validator');
const bodyParser = require ('koa-bodyparser');

handlebars.registerHelper('json', context => JSON.stringify(context));

module.exports = (app) => {

  app.use(serve(path.join(__dirname, './../../client')));
  app.use(devMiddleware(compile));

  app.use(bodyParser());
  app.use(koaValidator());

  app.use(views(path.join(__dirname, './../../client'), {
    default: 'html',
    map: { html: 'handlebars' },
  }));

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
      if(ctx.status !== 401) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
      }
      else {
        ctx.status = err.status;
        ctx.body = err.message;
      }
    }
  });

  app.use(routes);
};
