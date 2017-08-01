const faker = require('Faker')
const cryptoHelper = require('lib/infrastructure/helpers').crypto
const idGenerator = require('lib/mongo/idGenerator')

class Builder {
  constructor ()  {
    this.data = {}
    this.data._id = idGenerator.generate()
  }

  addName() {
      this.data.firstName = faker.Name.firstName().toLowerCase()
      this.data.lastName = faker.Name.lastName().toLowerCase()
      return this
  }

  passwordHash (password = 'qwerty') {
    this.data.passwordHash = cryptoHelper.getHash(password)
    return this
  }

  email (email) {
    this.data.email = email || faker.Internet.email().toLowerCase()
    return this
  }

  admin () {
    this.data.isAdmin = true
    return this
  }

  build () {
    return this.data
  }
}

module.exports = Builder