const TaskBuilder = require('./task.builder')

const getTaskData = (userId) => {
  let taskBuilder = new TaskBuilder()
  return taskBuilder.setTaskInfo(null, userId)
}

exports.createTask = (userId) => getTaskData(userId).build()

exports.getTaskData = getTaskData