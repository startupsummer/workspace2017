const config = require('web/config');
const path = require('path');
const views = require('koa-views');
const routes = require('./routes');
const webpack = require('webpack');
const webpackConfig = require('web/webpack.config.js');
const { devMiddleware } = require('web/koa-webpack-middleware-master/middleware/index.js');
const serve = require('koa-static');
const koaBody = require('koa-body');
const validator = require('koa-async-validator');

const compile = webpack(webpackConfig);

module.exports = (app) => {
  app.use(koaBody());
  app.use(validator());

  app.use(views(path.join(__dirname, './../../client'), {
    default: 'html',
  }));

  app.use(routes);

  app.use(serve(path.join(__dirname, './../../client')));
  app.use(devMiddleware(compile));
};
