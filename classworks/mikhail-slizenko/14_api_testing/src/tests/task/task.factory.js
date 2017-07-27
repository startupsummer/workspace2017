const TaskBuilder = require('./task.builder')
const tasksService = require('resources/tasks/tasks.service')

exports.createTask = (createrId) => {
  let taskBuilder = new TaskBuilder()
  let task = taskBuilder
    .createrId(createrId)
    .title()
    .description()
    .participatorIds()
    .build()

  return tasksService.write.create(task)
}
