const ObjectID = require('mongoskin').ObjectID

module.exports.generate = function () {
  return ObjectID().toString()
}
