const TaskBuilder = require('./task.builder');
const idGenerator = require('lib/mongo/idGenerator');

exports.mandatoryTask = () => {
  let taskBuilder = new TaskBuilder();
  let task = taskBuilder
    .addId(idGenerator.generate())
    .addCreaterId('1')
    .title('Learn testing')
    .description('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    .participatorIds([])
    .build();

  return task;
}

exports.advancedTask = () => {
  let taskBuilder = new TaskBuilder();
  let task = taskBuilder
    .addId(idGenerator.generate())
    .addCreaterId('1')
    .title('Learn testing')
    .description('Learn how to write tests for REST api server.')
    .participatorIds()
    .build();

  return task;
}

exports.supperAdvancedTask = () => {
  let taskBuilder = new TaskBuilder();
  let task = taskBuilder
    .addId(idGenerator.generate())
    .addCreaterId('1')
    .title('HEllo')
    .description('Learn how to write tests for REST api server.')
    .participatorIds()
    .build();

  return task;
}
