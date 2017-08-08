const controller = require('./accounts.controller')

const Router = require('koa-router')
const router = new Router()

router.post('/signin', controller.signin)

module.exports = router.routes()
