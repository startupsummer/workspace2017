const controller = require('./hello.controller');
const router = require('koa-router')();

router.get('/', controller.sayHello);

module.exports = router.routes();
