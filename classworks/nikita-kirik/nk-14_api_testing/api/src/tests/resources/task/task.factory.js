const TaskBuilder = require('./task.builder')
const taskService = require('../../../resources/tasks/tasks.service')
const taskWriteService = taskService.write

exports.task = (creatorId) => {
  let taskBuilder = new TaskBuilder()
  let task = taskBuilder
    .taskTitle()
    .taskDiscription()
    .taskPaticipators()
    .taskCreator(creatorId)
    .build()

  return taskWriteService.create(task)
}
