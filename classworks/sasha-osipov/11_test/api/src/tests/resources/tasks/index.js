const taskFactory = require('tests/factory-tasks/tasks.factory')
const writeInBase = require('resources/tasks/tasks.service')

module.exports.addTask = (id) => writeInBase.write.create(taskFactory.task(id))

