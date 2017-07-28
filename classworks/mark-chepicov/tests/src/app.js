require('app-module-path').addPath(__dirname)

const config = require('config')
const logger = require('logger')
const tasks = require('./tests/resources/tasks/index');
const users = require('./tests/resources/users/index');
const Koa = require('koa')
const app = new Koa()
const applyMiddleware = require('config/koa')

applyMiddleware(app)
// tasks()
// users()

app.listen(config.port, config.ip, () => {
  logger.info('Api is listening on %d, in %s mode', config.port, config.env)
})

module.exports = app
