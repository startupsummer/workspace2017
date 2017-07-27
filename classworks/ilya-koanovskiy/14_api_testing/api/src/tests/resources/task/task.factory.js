const TaskBuilder = require('./task.builder.js')
const taskService = require('./../../../resources/tasks/tasks.service.js');


exports.task = async (user,ids) => {
  let taskBuilder = new TaskBuilder()
  let task = taskBuilder
    .createrId(user._id)
    .title()
    .description()
    .participatorIds(ids)
    .build()

  return taskService.write.create(task);
}
