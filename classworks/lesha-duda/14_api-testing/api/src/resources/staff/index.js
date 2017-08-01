const Router = require('koa-router')
const router = new Router()

const staffController = require('./staff.controller')

router.post('/', staffController.create)

router.get('/:id', staffController.byId)
router.put('/:id', staffController.update)

module.exports = router.routes()
