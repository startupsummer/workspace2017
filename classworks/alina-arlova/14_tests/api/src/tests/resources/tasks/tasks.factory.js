const taskBuilder = require('./tasks.builder.js');
const database = require('../../../resources/staff/staff.service.js');

exports.task = (creatorId) => {
  let builder = new taskBuilder();
  let task = builder
    .getId()
    .getCreatorId(creatorId)
    .getTitle()
    .getDescription()
    .participatorIds()
    .build()

  return task;
}
