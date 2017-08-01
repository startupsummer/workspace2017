const faker = require('Faker')
const tasksService = require('resources/tasks/tasks.service')
const idGenerator = require('lib/mongo/idGenerator')

class Builder {
  constructor () {
    this.data = {}
  }

  setTaskInfo (id, createrId, title, description) {
    this.data._id = id || idGenerator.generate()
    this.data.createrId = createrId
    this.data.title = title || faker.Lorem.sentence()
    this.data.description = description || faker.Lorem.sentences()
    this.data.participatorIds = []
    return this
  }

  build () {
    return tasksService.write.create(this.data)
  }
}

module.exports = Builder
