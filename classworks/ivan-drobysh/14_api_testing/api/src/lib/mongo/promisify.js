const Promise = require('bluebird')
let finished = false

function promisify (logger, mongoskin) {
  if (finished) { return }

  Object.keys(mongoskin).forEach(function (key) {
    let value = mongoskin[key]
    if (typeof value === 'function') {
      Promise.promisifyAll(value)
      Promise.promisifyAll(value.prototype)
    }
  })
  Promise.promisifyAll(mongoskin)

  finished = true
  logger.info('Added promises support to the mongoskin')
}

module.exports = promisify
