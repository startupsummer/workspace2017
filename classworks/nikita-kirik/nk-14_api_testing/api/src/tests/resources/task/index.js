const TaskFactory = require('./task.factory')
const StaffFactory = require('../staff/staff.factory')
const tokenFact = require('../auth.js')

const staffService = require('../../../resources/staff/staff.service')
const staffWriteService = staffService.write
const taskService = require('../../../resources/tasks/tasks.service')
const taskWriteService = taskService.write


const chai = require('chai')
chai.should()

module.exports.test = (request) => {
  let token;
  let admin;

  before(async () => {
    await staffWriteService.remove();
    await taskWriteService.remove();

    admin = await StaffFactory.admin();
    token = await tokenFact.signinAsRoot(request, admin);

    await TaskFactory.task(admin._id);
    await TaskFactory.task(admin._id);
    await TaskFactory.task(admin._id);
  })

  describe('Request', () => {
    it('should return 3 tasks', done => {
      // request.get({
      //   hostname: '/api/v1/tasks',
      //   headers: { 'Authorization': `Bearer ${token}` }
      // })
      request.get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, resp) => {
        if(err) return done(err)
        // console.log(resp, "json ",   JSON.parse(resp.text) );
        // JSON.parse(resp.text).results.length.should.be.equal(3)
        resp.body.results.length.should.be.equal(3)
        done();
      })
    })


  })

}
