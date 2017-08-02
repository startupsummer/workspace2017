const faker = require('Faker')
const crypto = require('infrastructure/helpers/crypto.helper.js');

class Builder{
  constructor() {
    this.data = {};
  }
  email() {
    this.data.email = faker.Internet.email().toLocaleLowerCase();
    return this;
  }

  password() {
    this.data.passwordHash = crypto.getHash('qwerty');
    return this;
  }

  firstName() {
    this.data.firstName = faker.Name.firstName();
    return this;
  }

  lastName() {
    this.data.lastName = faker.Name.lastName();
    return this;
  }

  isAdmin(bool){
    this.data.isAdmin = bool;
    return this;
  }

    build () {
    return this.data
  }
}

module.exports = Builder
