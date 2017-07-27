const config = require('./config')
const logger = require('./logger')

let db = require('./lib/mongo')(logger, config.mongo.connection)

module.exports = db
