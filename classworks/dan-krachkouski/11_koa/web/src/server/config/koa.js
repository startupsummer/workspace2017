const path = require('path')

const config = require('web/config')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const routes = require('./routes')
const views = require('koa-views')
const logger = require('koa-logger')
const serve = require('koa-static')
const handlebars = require('handlebars')

handlebars.registerHelper('json', context => JSON.stringify(context))

const webpack = require('webpack')
const { devMiddleware, hotMiddleware } = require('web/koa-webpack-middleware-master/middleware')

const webpackConfig = require('web/config/webpack.config.js')
const compile = webpack(webpackConfig)

module.exports = (app) => {
  app.use(logger())

  app.use(serve(path.join(__dirname, './../../client')))

  app.use(views(path.join(__dirname, './../../client'), {
    default: 'html',
    map: { html: 'handlebars' }
  }))

  app.use(devMiddleware(compile))

  app.use(hotMiddleware(compile))

  app.use(session({
    store: redisStore({
      host: config.redis.host,
      port: config.redis.port
    }),
    ttl: 3600 * 10000,
    cookie: {
      expires: false
    }
  }))

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.log(err)
      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  })

  app.use(routes)
}
