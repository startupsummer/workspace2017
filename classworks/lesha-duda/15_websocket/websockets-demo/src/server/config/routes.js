const mount = require('koa-mount');
const messageResource = require('resources/message/public');

module.exports = (app) => {
  app.use(mount('/api/messages', messageResource));
};
