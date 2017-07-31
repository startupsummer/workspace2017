const taskFactory = require('./tasks.factory')
const writeInBase = require('resources/tasks/tasks.service')

module.exports.addTask = (id) => writeInBase.write.create(taskFactory.task(id))

module.exports.removeTasks = (id) => writeInBase.write.remove()

