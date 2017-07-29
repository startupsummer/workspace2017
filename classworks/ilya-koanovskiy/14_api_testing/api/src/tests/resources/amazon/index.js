const supertest = require('supertest');
const app = require('app')
const request = supertest.agent(app.listen())
const taskService = require('resources/tasks/tasks.service.js')
const userService = require('resources/staff/staff.service.js')
const auth = require('./../../resources/auth')
const chai = require('chai')
const taskFactory = require('./../task/task.factory.js')
const userFactory = require('./../staff/user.factory.js')
const path = require('path');

 module.exports =  () => describe('Amazon api testing', function() {
  let task;
  let userUsual;
  let token
  let imageName = 'image.jpg';


  beforeEach(async () => {
    userUsual = await userFactory.user(true);
    task = await taskFactory.task(userUsual,[userUsual._id],imageName)
    token = await auth.signinAsRoot(request,userUsual);
  })
  
  afterEach(async () => {
    await userService.write.remove();
    await taskService.write.remove();
  })

  it('should put image', done => {
    request.put(`/api/v1/tasks/${task._id}/files`)
      .set('Authorization', `Bearer ${token}`)
      .attach(`${imageName}`,path.join(__dirname,imageName))
      .expect(res => res.body.results.ok.should.equal(1))
      .end(done)
  })
  
  it('should return image', done => {
    request.put(`/api/v1/tasks/${task._id}/files`)
      .set('Authorization', `Bearer ${token}`)
      .attach(`${imageName}`,path.join(__dirname,imageName))
      .then(() => {
        request.get(`/api/v1/tasks/${task._id}/files`)
          .set('Authorization', `Bearer ${token}`)
          .expect((200))
          .end(done)})      
  })
})