const UserBuilder = require('./user.builder')

exports.admin = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .setUserInfo()
    .setRoot()
    .savePasswordHash()
    .admin()
    .build()

  return user
}

exports.client = () => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .setUserInfo()
    .setEmail()
    .savePasswordHash()
    .client()
    .build()

  return user
}
