const controller = require('./message.controller');
const router = require('koa-router')();

router.get('/', controller.getMessage);
router.post('/', controller.sendMessage);
router.delete('/:id', controller.removeMessage);

module.exports = router.routes();
