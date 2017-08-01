const UserBuilder = require('./user.builder')

exports.superAdmin = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .organizationAdministration()
    .root()
    .allPermissions()
    .build()

  return user
}

exports.admin = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .admin()
    .email()
    .build()

  return user
}
