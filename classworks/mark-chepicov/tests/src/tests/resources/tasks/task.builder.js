const faker = require('Faker')
const idGenerator = require('lib/mongo/idGenerator');

class Builder {
  constructor ()  {
    this.data = {}
  }

  id(){
    this.data._id = idGenerator.generate();
    return this
  }

  creatorId(creatorId){
    this.data.creatorId = creatorId;
    return this
  }

  title(){
    this.data.title = faker.Lorem.sentence();
    return this
  }

  description(){
    this.data.description = faker.Lorem.sentence();
    return this
  }

  participatorIds(){
    this.data.participatorIds = [];
    return this
  }

  build(){
    return this.data;
  }
}

module.exports = Builder