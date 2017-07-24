const config = require('web/config');
const webpack = require('webpack');
const path = require('path');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const views = require('koa-views');
const routes = require('./routes');
const logger = require('koa-logger');
const handlebars = require('handlebars');

const { devMiddleware, hotMiddleware } = require('web/koa-webpack-middleware-master/middleware');
const webpackConfig = require('web/webpack.config');
const compile = webpack(webpackConfig);
const serve = require('koa-static');


const bodyParser = require('koa-bodyparser');


handlebars.registerHelper('json', context => JSON.stringify(context));


module.exports = (app) => {
  app.use(bodyParser());
  app.use(devMiddleware(compile));
  app.use(serve(path.join(__dirname, './../../client')));


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
      console.log(err);
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.use(routes);
};

