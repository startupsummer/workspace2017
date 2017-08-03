const Router = require('koa-router')
const router = new Router()

const controller = require('./files.controller')

router.get('/', controller.getFile)
router.put('/', controller.updateFile)
router.delete('/', controller.deleteFile)

module.exports = router
