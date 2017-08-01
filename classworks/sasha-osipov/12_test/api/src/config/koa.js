/**
 * Koa config
 */

const config = require('config')
const morgan = require('koa-morgan')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const logger = require('logger')
const validate = require('koa-validate')
const defineRoutes = require('./routes')

const getArray = obj => {
  if (!obj) {
    return []
  }

  if (obj instanceof Array) {
    return obj
  } else {
    return [obj]
  }
}

const routeErrorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    if (ctx.status < 400 || ctx.status >= 500) {
      logger.error(err)
      ctx.body = err.message + '<br />' + err.stack
    } else {
      let errors = getArray(ctx.errors)

      let message = err.message
      let messages = Object.keys(err).map(key => ({ [key]: err[key] }))

      if (!ctx.body) {
        if (errors.length + messages.length) {
          ctx.body = {
            errors: [...errors, ...messages]
          }
        } else {
          ctx.body = message
        }
      }

      logger.error(ctx.body)
    }
  }
}

module.exports = (app) => {
  validate(app)

  app.use(morgan(config.logType))
  app.use(cors({
    credentials: true
  }))

  app.use(bodyParser())
  app.use(routeErrorHandler)

  defineRoutes(app)
}
