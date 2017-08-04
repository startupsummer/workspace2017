const TaskBuilder = require('./TaskBuilder');
const Faker = require('Faker');

module.exports = {
  getTask(createrId)  {
    let taskBuilder = new TaskBuilder();


    return taskBuilder
    .setCreaterId(createrId)
    .setTitle(Faker.Name.lastName())
    .setDescription(Faker.Lorem.sentences())
    .setParticipatorIds([])
    .build();
  }
}
