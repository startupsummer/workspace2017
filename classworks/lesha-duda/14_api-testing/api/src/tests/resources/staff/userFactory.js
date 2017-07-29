const UserBuilder = require('./userBuilder')

exports.user = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .firstName()
    .lastName()
    .passwordHash('qwerty')
    .admin(false)
    .email()
    .build()

  return user
}

exports.admin = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .admin(true)
    .email()
    .passwordHash('qwerty')
    .firstName()
    .lastName()
    .build()

  return user
}
