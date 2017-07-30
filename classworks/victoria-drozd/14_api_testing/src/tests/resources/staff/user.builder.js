const faker = require('Faker')
const cryptoHelper = require('infrastructure/helpers/crypto.helper')
const staffService = require('resources/staff/staff.service')
const idGenerator = require('lib/mongo/idGenerator')

class Builder {
  constructor () {
    this.data = {}
  }

  setUserInfo (id, firstName, lastName) {
    this.data._id = id || idGenerator.generate()
    this.data.firstName = firstName || faker.Name.firstName()
    this.data.lastName = lastName || faker.Name.lastName()
    return this
  }

  setRoot () {
    this.data.email = `root${Date.now()}@root.root`
    return this
  }

  setEmail (email) {
    this.data.email = email || faker.Internet.email().toLowerCase()
    return this
  }

  savePasswordHash (pswrd = 'qwerty') {
    this.data.passwordHash = cryptoHelper.getHash(pswrd)
    return this
  }

  admin () {
    this.data.isAdmin = true
    return this
  }

  client () {
    this.data.isAdmin = false
    return this
  }

  build () {
    return staffService.write.create(this.data)
  }
}

module.exports = Builder
