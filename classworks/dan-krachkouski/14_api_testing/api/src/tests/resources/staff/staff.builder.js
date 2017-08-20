const idGenerator = require('lib/mongo/idGenerator')
const faker = require('faker')
const { crypto } = require('infrastructure/helpers')

const staffService = require('resources/staff/staff.service')

class StaffBuilder {
  constructor () {
    this.data = {}
    this.data._id = idGenerator.generate()
  }

  firstName (str = faker.name.firstName()) {
    this.data.firstName = str
    return this
  }

  lastName (str = faker.name.lastName()) {
    this.data.lastName = str
    return this
  }

  email (str = faker.internet.email().toLowerCase()) {
    this.data.email = str
    return this
  }

  password (str = faker.internet.password()) {
    this.data.passwordHash = crypto.getHash(str)
    return this
  }

  admin (bool = true) {
    this.data.isAdmin = bool
    return this
  }

  build () {
    return staffService.write.create(this.data)
  }
}

module.exports = StaffBuilder
