const UserBuilder = require('./user.builder')
const users = require('resources/staff/staff.service')

exports.admin = () => {
  let userBuilder = new UserBuilder()
  let admin = userBuilder
    .id()
    .email()
    .password()
    .firstName()
    .lastName()
    .isAdmin(true)
    .build()
  
  return users.write.create(admin)
}

exports.user = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .id()
    .email()
    .password()
    .firstName()
    .lastName()
    .isAdmin(false)
    .build()
  return users.write.create(user)
}