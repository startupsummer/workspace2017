const faker = require('Faker')
const { generate } = require('lib/mongo/idGenerator')

class taskBuilder {
  constructor() {
    this.data = {},
    this.data._id = generate()
  }

  createrId(id) {
    this.data.createrId = id
    return this
  }

  title(title) {
    this.data.title = title || faker.Lorem.words()
    return this
  }

  description(description) {
    this.data.description = description || faker.Lorem.paragraph()
    return this
  }

  participatorIds(array = []) {
    this.data.participatorIds = array
    return this
  }

  build() {
    return this.data
  }
}

module.exports = taskBuilder
