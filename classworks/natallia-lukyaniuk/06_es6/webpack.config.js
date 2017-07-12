const webpackProdConfig = require('./config/webpack.prod');
const webpackDevConfig = require('./config/webpack.dev');

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = webpackProdConfig;
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = webpackDevConfig;
}