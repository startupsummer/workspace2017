const TaskBuilder = require('./task.builder.js')
const taskService = require('./../../../resources/tasks/tasks.service.js');


exports.task = async (user,ids,fileName = 'image.jpg') => {
  let taskBuilder = new TaskBuilder()
  let task = taskBuilder
    .createrId(user._id)
    .title()
    .description()
    .participatorIds(ids)
    .fileFileName(fileName)
    .build()


  return taskService.write.create(task);
}
