// TASKS
const UserFactory = require('../UserFactory');
const TaskFactory = require('../TaskFactory');
const userServ = require('resources/staff/staff.service');
const taskServ = require('resources/tasks/tasks.service');
const { signinAsRoot } = require('../auth');
const chai = require('chai');
chai.should();
// 4
exports.first = (request) => {
  let admin = UserFactory.getAdmin();
  let task1 = TaskFactory.getTask(admin._id);
  let task2 = TaskFactory.getTask(admin._id);
  let task3 = TaskFactory.getTask(admin._id);
  let token;
  describe('Test GET /tasks', function() {
    before(async () => {
      await taskServ.write.remove();
      await userServ.write.remove();
      await userServ.write.create(admin)
      await taskServ.write.create(task1);
      await taskServ.write.create(task2);
      await taskServ.write.create(task3);
      token = await signinAsRoot(request, admin);
    })
    it('should return tasks', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect((resp) => {
          resp.body.results.length.should.be.equal(3);
        })
        .end(done);
    })
  });
}
