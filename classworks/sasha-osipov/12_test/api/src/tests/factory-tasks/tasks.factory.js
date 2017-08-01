const TaskBuilder = require('./tasks.builder')

exports.task = (id) => {
  let taskBuilder = new TaskBuilder()
  let task = taskBuilder
    .creatorId(id)
    .addTitle()
    .addDescription()
    .addParticipator() 
    .build()
  
  return task
}

