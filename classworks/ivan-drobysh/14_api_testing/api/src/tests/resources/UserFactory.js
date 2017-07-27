const UserBuilder = require('./UserBuilder');
const Faker = require('Faker');

module.exports = {
  getAdmin()  {
    let adminBuilder = new UserBuilder();
    return adminBuilder
    .setEmail(Faker.Internet.email().toLowerCase())
    .setFirstName(Faker.Name.firstName())
    .setLastName(Faker.Name.lastName())
    .setPassword('zxcvbn')
    .setAdmin(true)
    .build();
  },
  getClient() {
    let clientBuilder = new UserBuilder();

    return clientBuilder
    .setEmail(Faker.Internet.email().toLowerCase())
    .setFirstName(Faker.Name.firstName())
    .setLastName(Faker.Name.lastName())
    .setPassword('zxcvbn')
    .build();
  }
}
