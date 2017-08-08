const idGenerator = require('lib/mongo/idGenerator')
const faker = require('faker')

const tasksService = require('resources/tasks/tasks.service')

class TasksBuilder {
  constructor () {
    this.data = {}
    this.data._id = idGenerator.generate()
  }

  creatorId (str) {
    this.data.createrId = str
    return this
  }

  title (str = faker.name.title()) {
    this.data.title = str
    return this
  }

  decsription (str = faker.lorem.paragraph()) {
    this.data.decsription = str
    return this
  }

  participatorIds (idsArray = []) {
    this.data.participatorIds = idsArray
    return this
  }

  build () {
    if (this.data.createrId) {
      return tasksService.write.create(this.data)
    } else {
      throw new Error('Unfinished build!')
    }
  }
}

module.exports = TasksBuilder
