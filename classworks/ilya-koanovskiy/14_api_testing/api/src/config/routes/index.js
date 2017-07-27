const jwt = require('koa-jwt')

const config = require('config')

const middlewares = require('infrastructure/middlewares')
const publicRoutes = require('./public')
const authenticatedRoutes = require('./authenticated')

const jwtOptions = {
  secret: config.secret,
  audience: config.audience,
  issuer: config.audience
}

const defineRoutes = (app) => {
  app.use(publicRoutes)

  app.use(middlewares.urlToken)
  app.use(jwt(jwtOptions))
  app.use(middlewares.tenant)
  app.use(middlewares.authorization)

  app.use(authenticatedRoutes)
}

module.exports = defineRoutes
