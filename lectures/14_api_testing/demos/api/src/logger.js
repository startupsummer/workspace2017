const loggly = require('config').loggly
const logger = require('lib/logger')

module.exports = logger.configure(loggly, true)
