const mount = require('koa-mount');
const routes = require('./routes');

module.exports = (app) => {
  app.router('/hello', routes.hello);
};
