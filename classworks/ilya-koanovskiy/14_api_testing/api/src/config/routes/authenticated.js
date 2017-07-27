const prefix = require('config').apiPrefix

const Router = require('koa-router')
const router = new Router({ prefix })

router.use('/users', require('resources/staff'))
router.use('/tasks', require('resources/tasks'))

module.exports = router.routes()
