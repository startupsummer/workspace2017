const UserBuilder = require('./user.builder')
const staffService = require('resources/staff/staff.service')

exports.createClient = (id) => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .email()
    .password()
    .firstName()
    .lastName()
    .build()

  return staffService.write.create(user)
}

exports.createAdmin = (id) => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .email()
    .password()
    .firstName()
    .lastName()
    .isAdmin()
    .build()

  return staffService.write.create(user)
}
