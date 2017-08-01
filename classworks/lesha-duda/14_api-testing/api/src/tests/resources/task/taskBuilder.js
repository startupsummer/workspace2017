const faker = require('Faker')
const idGenerator = require('lib/mongo/idGenerator.js')
const writeService = require('resources/tasks/tasks.service.js')


class TaskBuilder {
  constructor(id) {
    this.data = {}
    this.data._id = idGenerator.generate()
    this.data.createrId = id
  }

  title(title) {
    this.data.title = title || faker.Lorem.words(4)
    return this  
  }

  description(description) {
    this.data.description = description || faker.Lorem.words(3)
    return this
  }

  participatorIds(ids) {
    this.data.participatorIds = ids
    return this
  }

  build() {
    return writeService.write.create(this.data)
  }
}

module.exports = TaskBuilder