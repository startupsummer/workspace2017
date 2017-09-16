const faker = require('Faker')
const { getHash } = require('infrastructure/helpers/crypto.helper')
const { generate } = require('lib/mongo/idGenerator')

class userBuilder {
  constructor()  {
    this.data = {},
    this.data._id = generate()
  }

  email(email) {
    this.data.email = email || faker.Internet.email().toLowerCase()
    return this
  }

  password(password = 'qwerty') {
    this.data.passwordHash = getHash(password)
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

  isAdmin() {
    this.data.isAdmin = true
    return this
  }

  build() {
    return this.data
  }
}

module.exports = userBuilder
