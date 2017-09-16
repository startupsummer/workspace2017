const path = require('path');
const requestLogger = require('koa-logger');
const serve = require('koa-static');
const webpack = require('webpack');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const handlebars = require('handlebars');
const initRoutes = require('./routes');
const convert = require('koa-convert');
const historyApiFallback = convert(require('koa-connect-history-api-fallback'));
const webpackDevMiddleware = convert(require('koa-webpack-dev-middleware'));
const webpackHotMiddleware = convert(require('koa-webpack-hot-middleware'));
const webpackConfig = require('../../client/src/webpack.config');

const webpackCompiler = webpack(webpackConfig);

const logger = global.logger;

const pathToStatic = path.join(__dirname, './../../client/src');
handlebars.registerHelper('json', context => JSON.stringify(context));

const configureWebpack = (app) => {
  app.use(webpackDevMiddleware(webpackCompiler, { publicPath: '/static/' }));
  app.use(webpackHotMiddleware(webpackCompiler));

  const webpackMiddlewareOptions = {
    publicPath: webpackConfig.output.publicPath,
  };
};

module.exports = (app) => {
  app.use(requestLogger());

  app.use(views(pathToStatic, {
    default: 'html',
    map: { html: 'handlebars' },
    options: {
      helpers: {
        json: ctx => JSON.stringify(ctx),
      },
    },
  }));

  app.use(bodyParser());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      this.status = err.status || 500;
      this.body = {
        errors: [{ _global: 'An error has occurred' }],
      };
    }
  });
  configureWebpack(app);

  initRoutes(app);

  app.use(historyApiFallback({
    verbose: false,
  }));


  app.use(serve(pathToStatic));
};
