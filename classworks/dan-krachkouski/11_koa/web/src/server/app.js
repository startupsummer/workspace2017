process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const config = require('web/config')
const Koa = require('koa')

const app = new Koa()

app.keys = ['keys', 'keykeys'] // session keys

require('./config/koa')(app)

if (!module.parent) {
  app.listen(config.port, config.ip, () => {
    console.warn('Koa server listening on %d, in %s mode', config.port, config.env)
  })
}

module.exports = app
