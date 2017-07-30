const UserBuilder = require('./userBuilder')


exports.user = async () => {
  let userBuilder = new UserBuilder()
  let user = await userBuilder
    .firstName()
    .lastName()
    .passwordHash('qwerty')
    .admin(false)
    .email()
    .build()

  return user
}

exports.admin = async () => {
  let userBuilder = new UserBuilder()
  let user = await userBuilder
    .admin(true)
    .email()
    .passwordHash('qwerty')
    .firstName()
    .lastName()
    .build()

  return user
}
