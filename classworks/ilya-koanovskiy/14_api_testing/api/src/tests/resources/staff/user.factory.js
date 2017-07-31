const UserBuilder = require('./user.builder.js')
const userService = require('resources/staff/staff.service.js');

exports.user = async (bool) => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .email()
    .password()
    .firstName()
    .lastName()
    .isAdmin(bool)
    .build()

  return userService.write.create(user);
}