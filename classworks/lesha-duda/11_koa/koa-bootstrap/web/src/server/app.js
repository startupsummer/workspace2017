process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('web/config');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.keys = ['keys', 'keykeys']; // session keys
app.use(koaBody());
require('./config/koa')(app);

if (!module.parent) {
  app.listen(config.port, config.ip, () => {
    console.warn('Koa server listening on %d, in %s mode', config.port, config.env);
  });
}

module.exports = app;
