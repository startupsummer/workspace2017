const TaskBuilder = require('./task.builder')

exports.task = (userId) => {
  let taskBuilder = new TaskBuilder()
  let task = taskBuilder
    .setTaskInfo(null, userId)
    .build()

  return task
}
