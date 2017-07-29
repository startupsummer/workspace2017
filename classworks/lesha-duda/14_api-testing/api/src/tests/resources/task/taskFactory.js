const TaskBuilder = require('./taskBuilder')


exports.publicTask = async (id, ids) => {
  let taskBuilder = new TaskBuilder(id)
  let task = await taskBuilder
    .title()
    .description()
    .participatorIds(ids)
    .build()

  return task
}