const UserBuilder = require('./user.builder')

let userBuilder1 = new UserBuilder()
let superAdmin = userBuilder1
  .lastName("User")
  .firstName("Bad")
  .password("qwerty")
  .email()
  .build()

let userBuilder2 = new UserBuilder()
let admin = userBuilder2
  .admin()
  .lastName("Duda")
  .firstName("Lesha")
  .password("admin")
  .email()
  .build()

console.log('super admin:', superAdmin)
console.log('admin: ', admin)
