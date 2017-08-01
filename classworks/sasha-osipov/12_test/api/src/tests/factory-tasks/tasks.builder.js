const faker = require('Faker')
const idGenerator = require('lib/mongo/idGenerator')

class Builder {
  constructor ()  {
    this.data = {}
    this.data._id = idGenerator.generate()
  }

  creatorId (id) {
    this.data.creatorId = id
    return this
  }

  addTitle () {
    this.data.title = faker.Lorem.sentence()
    return this
  }

  addDescription () {
    this.data.description = faker.Lorem.sentences()
    return this
  }

  addParticipator () {
    this.data.participatorIds = []
    return this
  }

  build () {
    return this.data
  }
}

module.exports = Builder