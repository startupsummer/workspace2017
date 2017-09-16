const faker = require('Faker');
const { generate } = require('lib/mongo/idGenerator.js');

class Builder {
  constructor() {
    this.data = {};
  }

  getTitle() {
    this.data.title = faker.Lorem.sentence();
    return this;
  }

  getDescription() {
    this.data.description = faker.Lorem.sentence();
    return this;
  }

  getId() {
    this.data._id = generate();
    return this;
  }

  getCreatorId(creatorId) {
    this.data.creator_id = creatorId;
    return this;
  }

  participatorIds() {
    this.data.participatorIds = [];
    return this;
  }

  build() {
    return this.data;
  }
}

module.exports = Builder;
