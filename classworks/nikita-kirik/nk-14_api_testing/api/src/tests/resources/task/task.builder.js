const faker = require('Faker')
const cryptoHelper = require('../../../infrastructure/helpers/crypto.helper')
const idGenerator = require('../../../lib/mongo/idGenerator')

class Task {
  constructor ()  {
    this.data = {}
  }

  taskId(id) {
    this.data._id = idGenerator.generate();
  }

  taskTitle (title) {
    this.data.title = title || faker.Lorem.sentence();
    return this
  }

  taskDiscription (discr) {
    this.data.discription = discr || faker.Lorem.sentence();
    return this
  }

  taskPaticipators(participators) {
    this.data.participatorIds = participators || [];
    return this

  }

  taskCreator(creatorId) {
    this.data.creatorId = creatorId;
    return this
  }

  build () {
    return this.data
  }
}

module.exports = Task
