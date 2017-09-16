
const userFactory = require('./user.factory.js');
const taskFactory = require('../tasks/tasks.factory.js');
const usersDatabase = require('resources/staff/staff.service.js');
const tasksDatabase = require('resources/tasks/tasks.service.js');
const { generate } = require('lib/mongo/idGenerator.js');
const chai = require('chai');
const { signinAsRoot } = require('../auth');

chai.should()

exports.saveUser = (request) => {
  let token;
  let admin = userFactory.admin();
  let task1 = taskFactory.task(admin._id);
  let task2 = taskFactory.task(admin._id);
  let task3 = taskFactory.task(admin._id);
  describe('Writing to database', function() {
    before(async () => {
      await usersDatabase.write.remove();
      await tasksDatabase.write.remove();

      await usersDatabase.write.create(admin);
      await tasksDatabase.write.create(task1);
      await tasksDatabase.write.create(task2);
      await tasksDatabase.write.create(task3);

      token = await signinAsRoot(request, admin);
    })
    it('should contain 3 tasks', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect((resp) => { resp.body.results.length.should.equal(3) })
        .end(done)
    })
  });
}

exports.updateClient = (request) => {
  let token;
  let client = userFactory.client();
  describe('Update first name and password', function() {
    before(async () => {
      await usersDatabase.write.remove();
      await tasksDatabase.write.remove();

      await usersDatabase.write.create(client);
      token = await signinAsRoot(request, client);
    })
    it('should the same person', done => {
      client.firstName = 'BLABLABLA';
      client.password = '123';

      request.put(`/api/v1/users/${client._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(client)
        .expect((resp) => { resp.body.results.value.firstName.should.equal(client.firstName) })
        .end(done)
    })
  });
}

exports.updateAnotherClient = (request) => {
  let token;
  let firstClient = userFactory.client();
  let secondClient = userFactory.client();
  describe('Update first name of another person', function() {
    before(async () => {
      await usersDatabase.write.remove();
      await tasksDatabase.write.remove();

      await usersDatabase.write.create(firstClient);
      await usersDatabase.write.create(secondClient);
      token = await signinAsRoot(request, firstClient);
    })
    it ('cannot be done', done => {
      secondClient.firstName = "CHANGED";
      secondClient.password = "password";

      request.put(`/api/v1/users/${secondClient._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(secondClient)
      .expect(403)
      .end(done)
    })
  });
}

exports.createTask = (request) => {
  let token;
  let client = userFactory.client();
  let task = taskFactory.task();
  describe('Task creation', function() {
    before(async () => {
      await usersDatabase.write.remove();
      await tasksDatabase.write.remove();

      await usersDatabase.write.create(client);
      token = await signinAsRoot(request, client);
    })
    it ('cannot be done', done => {
      request.put(`/api/v1/tasks/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect(403)
      .end(done)
    })
  });
}

exports.updateTaskByAdmin = (request) => {
  let token;
  let admin = userFactory.admin();
  let task = taskFactory.task();
  describe('Task updating', function() {
    before(async () => {
      await usersDatabase.write.remove();
      await tasksDatabase.write.remove();

      await usersDatabase.write.create(admin);
      await tasksDatabase.write.create(task);
      token = await signinAsRoot(request, admin);
    })
    it ('can be done by admin', done => {
      task.title = "NEW TASK TITLE";

      request.put(`/api/v1/tasks/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect(200)
      .end(done)
    })
  });
}

exports.addParticipatorbyAdmin = (request) => {
  let token;
  let admin = userFactory.admin();
  let client = userFactory.client();
  let anotherAdmin = userFactory.admin();
  let task = taskFactory.task();
  describe('Addition participator by admin', function() {
    before(async () => {
      await usersDatabase.write.remove();
      await tasksDatabase.write.remove();

      await usersDatabase.write.create(admin);
      await usersDatabase.write.create(client);
      await usersDatabase.write.create(anotherAdmin);
      await tasksDatabase.write.create(task);
      token = await signinAsRoot(request, admin);
    })
    it ('can be done', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${client._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end(done)
    })
    it ('can be done', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${anotherAdmin._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end(done)
    })
  });
}

exports.addParticipatorbyClient = (request) => {
  let token;
  let client = userFactory.client();
  let anotherClient = userFactory.client();
  let task = taskFactory.task();
  describe('Addition participator by client', function() {
    before(async () => {
      await usersDatabase.write.remove();
      await tasksDatabase.write.remove();

      await usersDatabase.write.create(client);
      await usersDatabase.write.create(anotherClient);
      await tasksDatabase.write.create(task);
      token = await signinAsRoot(request, client);
    })
    it ('cannot be done', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${anotherClient._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403)
      .end(done)
    })
  });
}
