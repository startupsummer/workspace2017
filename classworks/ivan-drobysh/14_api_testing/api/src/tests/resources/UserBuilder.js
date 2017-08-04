const crypto = require('infrastructure/helpers/crypto.helper');
const gen = require('lib/mongo/idGenerator');

module.exports = class UserBuilder {
  constructor() {
    this.data = {
      isAdmin: false,
      _id: gen.generate(),
    };
  }

  setEmail(email) {
    this.data.email = email;
    return this;
  }

  setFirstName(firstName) {
    this.data.firstName = firstName;
    return this;
  }

  setLastName(lastName) {
    this.data.lastName = lastName;
    return this;
  }

  setAdmin() {
    this.data.isAdmin = true;
    return this;
  }

  setPassword(password) {
    this.data.passwordHash  = crypto.getHash(password);
    return this;
  }

  build() {
    return this.data;
  }
}
