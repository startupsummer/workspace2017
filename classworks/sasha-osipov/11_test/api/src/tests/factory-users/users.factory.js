const UserBuilder = require('./users.builder')

exports.user = (pass) => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .addName()
    .passwordHash(pass)
    .email()
    .build()
  
  return user
}

exports.admin = (pass) => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .addName()
    .passwordHash(pass)
    .email()
    .admin()
    .build()
  
  return user
}
