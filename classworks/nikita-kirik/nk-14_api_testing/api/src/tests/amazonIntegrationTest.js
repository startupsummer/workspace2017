const staffService = require('../resources/staff/staff.service')
const staffWriteService = staffService.write
const taskService = require('../resources/tasks/tasks.service')
const taskWriteService = taskService.write

const TaskFactory = require('./resources/task/task.factory')
const StaffFactory = require('./resources/staff/staff.factory')
const tokenFact = require('./resources/auth.js')

const path = require('path');
const chai = require('chai')
const should = chai.should()

module.exports.test = (request) => {

  let token;
  let admin;
  let task;

  describe('#Request ', () => {
    before(async () => {
      await staffWriteService.remove();
      await taskWriteService.remove();

      admin = await StaffFactory.admin();
      token = await tokenFact.signinAsRoot(request, admin);
      task = await TaskFactory.task(admin._id);
    })

    after(async () => {
      await staffWriteService.remove();
      await taskWriteService.remove();
    })

    it('Update file', done => {
      request.put(`/api/v1/tasks/${task._id}/files/`)
      .set('Authorization', `Bearer ${token}`)
      .attach('image', path.resolve(__dirname, 'image.jpg'))
      .expect(200)
      .end((err, resp) => {
        if(err) return done(err)
        resp.body.results.value.should.have.property('fileFileName');
        done();
      })
    })

    it('Delete file', done => {
      request.delete(`/api/v1/tasks/${task._id}/files/`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, resp) => {
        if(err) return done(err)
        should.equal(resp.body.results.value.fileFileName, null)
        done()
      })
    })

  })

}
