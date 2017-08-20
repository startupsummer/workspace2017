// STAFF
const UserFactory = require('../UserFactory');
const TaskFactory = require('../TaskFactory');
const userServ = require('resources/staff/staff.service');
const taskServ = require('resources/tasks/tasks.service');
const { signinAsRoot } = require('../auth');
const chai = require('chai');
chai.should();

// 5
exports.start = (request) => {
  let client = UserFactory.getClient();
  let client1 = UserFactory.getClient();
  let client2 = UserFactory.getClient();
  let task = TaskFactory.getTask(client._id);
  let admin = UserFactory.getAdmin();
  let token;
  describe('Test PUT /users', function() {
    beforeEach(async () => {
      await userServ.write.create(admin);
      await userServ.write.create(client);
      await userServ.write.create(client1);
      await userServ.write.create(client2);
      await taskServ.write.create(task);
      token = await signinAsRoot(request, client);
      token1 = await signinAsRoot(request, client1);
      tokenA = await signinAsRoot(request, admin);
    })

    afterEach(async () => {
      await taskServ.write.remove();
      await userServ.write.remove();
    })
    it('should return new client', done => {
      client.firstName = 'VANYANYA';
      client.password = '123456';

      request.put(`/api/v1/users/${client._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(client)
        .expect((resp) => {
          resp.body.results.value.firstName.should.be.equal(client.firstName);
        })
        .end(done);
    })

    it('should return error 403', done => {
      client2.firstName = 'VANYANYA';
      client2.password = '123456';

      request.put(`/api/v1/users/${client2._id}`)
        .set('Authorization', `Bearer ${token1}`)
        .send(client2)
        .expect(403)
        .end(done);
    })

    it('should return error 403', done => {
      request.post(`/api/v1/tasks`)
        .set('Authorization', `Bearer ${token}`)
        .send(task)
        .expect(403)
        .end(done);
    })

    it('should return 200', done => {
      task.title = 'My Title';
      request.put(`/api/v1/tasks/${task._id}`)
        .set('Authorization', `Bearer ${tokenA}`)
        .send(task)
        .expect((resp) => {
          resp.body.results.value.title.should.be.equal(task.title);
        })
        .end(done);
    })

    it('should return 200', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${client._id}`)
        .set('Authorization', `Bearer ${tokenA}`)
        .expect(200)
        .end(done);
    })

    it('should return 403', done => {
      request.post(`/api/v1/tasks/${task._id}/participators/${client2._id}`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(403)
        .end(done);
    })

  });
}
