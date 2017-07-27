const userFactory = require('./user.factory')

let admin = userFactory.admin()
let superAdmin = userFactory.superAdmin()

console.log('super admin:', superAdmin)
console.log('admin: ', admin)
