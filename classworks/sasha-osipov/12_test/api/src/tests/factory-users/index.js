const userFactory = require('./users.factory')
const writeInBase = require('resources/staff/staff.service')

module.exports.addAdmin = () => writeInBase.write.create(userFactory.admin())

module.exports.addUser = () => writeInBase.write.create(userFactory.user())

module.exports.removeStaff = () => writeInBase.write.remove()