const winston = require('winston')

module.exports.configure = function (loggly, isDev) {
  let transports,
    errorTransports,
    logger

  loggly = loggly || {}
  isDev = isDev !== undefined ? isDev : true

  transports = [
    new (winston.transports.Console)({
      colorize: true,
      level: isDev ? 'debug' : 'info'
    })
  ]

  errorTransports = [
    new (winston.transports.Console)({
      colorize: true,
      json: true
    })
  ]

  if (loggly.isEnabled) {
    let logglyTransport

    require('winston-loggly')

    console.log('adding loggly logger for winston', loggly.inputToken)
    logglyTransport = new (winston.transports.Loggly)(loggly)

    transports.push(logglyTransport)
    errorTransports.push(logglyTransport)
  }

  logger = new (winston.Logger)({
    exitOnError: false,
    transports: transports
  })

  return logger
}
