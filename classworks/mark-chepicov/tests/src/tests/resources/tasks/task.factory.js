const TaskBuilder = require('./task.builder')
const tasks = require('resources/tasks/tasks.service')

exports.task = (creatorId) => {
  let taskBuilder = new TaskBuilder()
  let task = taskBuilder
    .id()
    .creatorId(creatorId)
    .title()
    .description()
    .participatorIds()
    .build()
  return tasks.write.create(task)
}