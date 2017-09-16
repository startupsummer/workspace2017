const faker = require('Faker')
const cryptoHelper = require('../../../infrastructure/helpers/crypto.helper')
const idGenerator = require('../../../lib/mongo/idGenerator')

class Staff {
  constructor ()  {
    this.data = {}
  }

  admin () {
    this.data.isAdmin = true
    return this
  }

  client () {
    this.data.idAdmin = false
    return this
  }

  personalInfo() {
    this.data._id = idGenerator.generate();

    this.data.firstName = faker.Name.firstName();
    this.data.lastName = faker.Name.lastName();
    // this.data.passwordHash = cryptoHelper.getHash(faker.internet.password());
    this.data.passwordHash = cryptoHelper.getHash('qwerty');
    return this

  }

  email (email) {
    this.data.email = email || faker.Internet.email().toLowerCase()
    return this
  }

  build () {
    return this.data
  }
}

module.exports = Staff
