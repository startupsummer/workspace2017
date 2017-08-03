const UserBuilder = require('./user.builder')

exports.admin = () => {
  let userBuilder = new UserBuilder()
  let userPromise = userBuilder
    .setUserInfo()
    .setRoot()
    .savePasswordHash()
    .admin()
    .build()

  return userPromise
}

exports.client = () => {
  let userBuilder = new UserBuilder()
  let userPromise = userBuilder
    .setUserInfo()
    .setEmail()
    .savePasswordHash()
    .client()
    .build()

  return userPromise
}
