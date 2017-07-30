const Router = require('koa-router')
const prefix = require('config').apiPrefix
const publicRoutes = new Router({ prefix })

publicRoutes.use('/accounts', require('resources/accounts'))

module.exports = publicRoutes.routes()
