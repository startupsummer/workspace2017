const faker = require('faker')
const cryptoHelper = require('infrastructure/helpers/crypto.helper')

class Builder {
  constructor ()  {
    this.data = {}
  }

  addId(id) {
    this.data._id = id;
    return this;
  }

  email(email = faker.internet.email().toLowerCase()) {
    this.data.email = email;
    return this;
  }

  passwordHash(password) {
    this.data.passwordHash = cryptoHelper.getHash(password);
    return this;
  }

  firstName(name) {
    this.data.firstName = name;
    return this;
  }

  lastName(name) {
    this.data.lastName = name;
    return this;
  }

  admin() {
    this.data.isAdmin = true;
    return this;
  }

  user() {
    this.data.isAdmin = false;
    return this;
  }

  build () {
    return this.data
  }
}

module.exports = Builder
