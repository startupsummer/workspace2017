const userFactory = require('./userFactory')
let admin = userFactory.admin()
let user = userFactory.user()

module.exports.admin = admin;
module.exports.user = user;