const config = require('web/config');
const path = require('path');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const views = require('koa-views');
const routes = require('./routes');
const logger = require('koa-logger');
const handlebars = require('handlebars');

const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require("../../../koa-webpack-middleware-master/middleware");
const webpackOptions = require("../../../webpack.config.js");

const staticFiles = require('koa-static');
const dateFormat = require('dateformat');
const koaBody = require('koa-body');
const validate = require('koa-validate');


handlebars.registerHelper('json', context => JSON.stringify(context));


module.exports = (app) => {
  app.use(koaBody());

  app.use(staticFiles(path.join(__dirname, './../../client/')));

  app.use(devMiddleware(webpack(webpackOptions)));

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
  validate(app);

  app.use(async (ctx, next) => {
    try {
      const date = new Date();
      ctx.session.date = dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.use(routes);
};
