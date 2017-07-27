const supertest = require('supertest');
const app = require('../../../app')
const request = supertest.agent(app.listen())
const user = require('./../../../resources/staff/staff.service.js')
const task = require('./../../../resources/tasks/tasks.service.js')
const auth = require('./../../resources/auth')
const chai = require('chai')
const userFactory = require('./user.factory.js')
const taskFactory = require('../task/task.factory.js')



module.exports = () => describe('User api testing', function() {
  let userUsual;
  let task;
  let token;
  let staff;
  let length;

  beforeEach(async () => {
    userUsual = await userFactory.user(false);
    secondUser = await userFactory.user(false); 
    token = await auth.signinAsRoot(request,userUsual);
  })
  
  afterEach(async () => {
    user.write.remove();
    task.write.remove();
  })

  it('should return updated name of the user', done => {
    userUsual.firstName = 'Vasiliy';
    userUsual.password = '125345345';
    request.put(`/api/v1/users/${userUsual._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userUsual)
      .expect((res) => res.body.results.value.firstName.should.equal('Vasiliy'))
      .end(done)
  })

  it('should return 403 code when non admin try to update other name', done => {
    request.put(`/api/v1/users/${secondUser._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userUsual)
      .expect(403) 
      .end(done)
  })
});