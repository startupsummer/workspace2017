const UserBuilder = require('./userBuilder')

exports.user = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .email()
    .passwordHash('qwerty')
    .firstName()
    .lastName()
    .build()


  return user
}

exports.admin = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .admin()
    .email()
    .passwordHash('qwerty')
    .firstName()
    .lastName()
    .build()

  return user
}
