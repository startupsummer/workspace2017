const TaskBuilder = require('./taskBuilder')


exports.publicTask = (id, ids) => {
  let taskBuilder = new TaskBuilder(id)
  let task = taskBuilder
    .title()
    .description()
    .participatorIds(ids)
    .build()

  return task
}