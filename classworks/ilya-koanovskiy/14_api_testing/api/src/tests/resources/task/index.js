const supertest = require('supertest');
const app = require('../../../app')
const request = supertest.agent(app.listen())
const user = require('./../../../resources/staff/staff.service.js')
const task = require('./../../../resources/tasks/tasks.service.js')
const auth = require('./../../resources/auth')
const chai = require('chai')
const userFactory = require('./../staff/user.factory.js')
const taskFactory = require('./task.factory.js')

module.exports = () => describe('Task api testing', function() {
  let userAdmin;
  let task;
  let token;
  let staff;
  beforeEach(async () => {
    userAdmin = await userFactory.user(true);
    staff = await userFactory.user(false);
    task = await taskFactory.task(userAdmin,[userAdmin._id]);  
    token = await auth.signinAsRoot(request,userAdmin);
    token2 = await auth.signinAsRoot(request,staff);
  })

  afterEach(async () => {
    user.write.remove({});
    task.write.remove({});
  })

  it('should return right number of users tasks', done => {
    taskFactory.task(userAdmin,[userAdmin._id]);
    taskFactory.task(userAdmin,[userAdmin._id]);
    taskFactory.task(userAdmin,[userAdmin._id]);
    taskFactory.task(userAdmin,[userAdmin._id]);
    request.get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {console.log(res.body) ; return res.body.results.should.have.lengthOf(4)})
      .end(done)
  })
  it('should return 403 when non admin try to create a task', done => {
    
    request.post(`/api/v1/tasks/`)
      .set('Authorization', `Bearer ${token2}`)
      .send(task)
      .expect(403) 
      .end(done)
  })
  it('should return title of updatet task', done => {
    request.put(`/api/v1/tasks/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect((res) => {return res.body.results.value.title.should.equal('Issue')}) 
      .end(done)
  })
  it('should return lenght of new participator array', done => {
    const length = task.participatorIds.length;
    request.post(`/api/v1/tasks/${task._id}/participators/${staff._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => res.body.results.value.participatorIds.length.should.equal(length+1)) 
      .end(done)
  })
  it('should return 403 when non admin try to add participator to task', done => {
    request.post(`/api/v1/tasks/${task._id}/participators/${userAdmin._id}`)
      .set('Authorization', `Bearer ${token2}`)
      .expect(403) 
      .end(done)
  })
});