const faker = require('Faker')
const idGenerator = require('lib/mongo/idGenerator');
const hash = require('infrastructure/helpers/crypto.helper');

class Builder {
  constructor ()  {
    this.data = {}
  }

  id(_id){
    this.data._id = _id || idGenerator.generate();
    return this
  }

  email(email){
    this.data.email = email || faker.Internet.email().toLowerCase();
    return this
  }

  password(pass = "qwerty"){
    this.data.passwordHash = hash.getHash(pass);
    return this
  }

  firstName(){
    this.data.firstName = faker.Name.firstName();
    return this
  }

  lastName(){
    this.data.lastName = faker.Name.lastName();
    return this
  }

  isAdmin(isAdmin){
    this.data.isAdmin = isAdmin;
    return this
  }

  build(){
    return this.data;
  }
}

module.exports = Builder