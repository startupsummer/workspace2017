const userFactory = require('./user.factory')

module.exports = function () {
  let admin = userFactory.admin()
  return admin
}
