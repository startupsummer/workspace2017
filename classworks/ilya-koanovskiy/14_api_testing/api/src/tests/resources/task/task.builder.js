const faker = require('Faker')

class Builder{
  constructor() {
    this.data = {};
  }
  createrId(createrId) {
    this.data.createrId = createrId;
    return this;
  }

  title() {
    this.data.title = faker.Lorem.sentence();
    return this;
  }

  description() {
    this.data.description = faker.Lorem.paragraphs();
    return this;
  }

  participatorIds(ids){
    this.data.participatorIds = ids;
    return this;
  }

    build () {
    return this.data
  }
}

module.exports = Builder
