const middlewares = require('./middlewares')
const routes = require('./routes')

module.exports = (app) => {
  middlewares(app)
  routes(app)
}
