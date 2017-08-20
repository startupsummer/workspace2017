const StaffBuilder = require('./staff.builder')

function getAdmin () {
  const admin = new StaffBuilder()
    .firstName()
    .lastName()
    .email()
    .admin(true)
    .password('admin')
    .build()
  return admin
}

function getUser () {
  const user = new StaffBuilder()
    .firstName()
    .lastName()
    .email()
    .admin(false)
    .password('user')
    .build()
  return user
}

module.exports = {
  getAdmin,
  getUser
}
