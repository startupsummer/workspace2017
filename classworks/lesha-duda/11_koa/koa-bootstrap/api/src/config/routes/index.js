const mount = require('koa-mount');
const routes = require('./routes');

module.exports = (app) => {
  app.use(mount('/hello', routes.hello));
};
