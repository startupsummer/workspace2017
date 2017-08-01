const controller = require('./message.controller');
const router = require('koa-router')();

router.get('/', controller.getMessage);
router.post('/', controller.sendMessage);

module.exports = router.routes();
