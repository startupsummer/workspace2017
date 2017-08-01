const UserBuilder = require('./user.builder')

let userBuilder1 = new UserBuilder()
let superAdmin = userBuilder1
  .organizationAdministration()
  .root()
  .allPermissions()
  .build()

let userBuilder2 = new UserBuilder()
let admin = userBuilder2
  .admin()
  .email()
  .build()

console.log('super admin:', superAdmin)
console.log('admin: ', admin)
