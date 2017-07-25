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

  app.use(session({
    key: 'koa:session', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 1000 * 60 * 10,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  }, app))

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
