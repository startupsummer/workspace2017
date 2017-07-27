const faker = require('Faker');
const crypto = require('../../../infrastructure/helpers/crypto.helper.js');
const database = require('../../../resources/staff/staff.service.js');
const { generate } = require('../../../lib/mongo/idGenerator.js');

class Builder {
  constructor() {
    this.data = {};
  }

  admin() {
    this.data.isAdmin = true;
    return this;
  }

  client() {
    this.data.isAdmin = false;
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

  email() {
    this.data.email = faker.Internet.email().toLowerCase();
    return this;
  }

  passwordHash() {
    this.data.passwordHash = crypto.getHash('qwerty');
    return this;
  }

  getId() {
    this.data._id = generate();
    return this;
  }

  build() {
    return this.data;
  }
}

module.exports = Builder;
