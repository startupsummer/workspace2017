const faker = require('Faker')
const cryptoHelper = require('infrastructure/helpers/crypto.helper')
const idGenerator = require('lib/mongo/idGenerator')
const writeService = require('resources/staff/staff.service.js')


class UserBuilder {
  constructor() {
    this.data = {}
    this.data._id = idGenerator.generate()
  }

  email(email) {
    this.data.email = email || faker.Internet.email().toLocaleLowerCase()
    return this
  }

  passwordHash(password) {
    this.data.passwordHash = cryptoHelper.getHash(password)
    return this
  }

  firstName(firstName) {
    this.data.firstName = firstName || faker.Name.firstName()
    return this
  }

  lastName(lastName) {
    this.data.lastName = lastName || faker.Name.lastName()
    return this
  }

  admin(isAdmin) {
    this.data.isAdmin = isAdmin
    return this
  }

  build() {
    return writeService.write.create(this.data)
  }
}

module.exports = UserBuilder