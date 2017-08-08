const TasksBuilder = require('./tasks.builder')

function getTask (creatorId, participatorIds) {
  const task = new TasksBuilder()
    .creatorId(creatorId)
    .title()
    .decsription()
    .participatorIds(participatorIds)
    .build()
  return task
}

module.exports = {
  getTask
}
