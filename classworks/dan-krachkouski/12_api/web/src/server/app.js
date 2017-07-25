const Koa = require('koa')
const app = new Koa()

const config = require('web/config/server')

const koaConfig = require('./config')
koaConfig(app)

// app.keys = ['keys', 'keykeys']

app.listen(config.port, config.host, () => {
  console.log(`Koa listening on port:${config.port}`)
})
