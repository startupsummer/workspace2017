const session = require('koa-session')
// const redisStore = require('koa-redis')
const views = require('koa-views')
const logger = require('koa-logger')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const asyncValidator = require('koa-async-validator')

const config = require('web/config/server')

const handlebars = require('handlebars')
handlebars.registerHelper('json', context => JSON.stringify(context))

module.exports = (app) => {
  app.use(views(config.publicPath, {
    default: 'html',
    map: { html: 'handlebars' }
  }))

  app.use(serve(config.publicPath))

  app.use(session(null, app))

  app.use(logger())

  app.use(bodyParser())

  app.use(asyncValidator())

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.error(err)
      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  })
}
