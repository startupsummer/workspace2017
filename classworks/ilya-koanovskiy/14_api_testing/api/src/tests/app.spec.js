const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen())
const {write} = require('./../resources/staff/staff.service.js')
const auth = require('./resources/auth')
const chai = require('chai')
chai.should();


const userFactory = require('./resources/staff/user.factory.js')
const taskFactory = require('./resources/task/task.factory.js')


describe('Get /tasks', function() {
  let token;
  before(async () => {
    const userAdmin = await userFactory.user(true);
    const task1 = await taskFactory.task(userAdmin,[userAdmin._id]);
    const task2 = await taskFactory.task(userAdmin,[userAdmin._id]);
    const task3 = await taskFactory.task(userAdmin,[userAdmin._id]);
    const task4 = await taskFactory.task(userAdmin,[userAdmin._id1]);

    token = await auth.signinAsRoot(request,userAdmin);
  
  })
  it('should return right number of users tasks', done => {
    request.get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => res.body.results.should.have.lengthOf(4))
      .end(done)
  })
});

describe('Update non admin user', function() {
  let userUsual;
  let token;
  before(async () => {
    userUsual = await userFactory.user(false);  
    console.log(userUsual);
    token = await auth.signinAsRoot(request,userUsual);
    console.log(token);
    userUsual.firstName = 'Vasiliy';
    userUsual.password = '125345345';
    console.log(userUsual);
  })
  it('should return some information', done => {
    request.put(`/api/v1/users/${userUsual._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userUsual)
      .expect((res) => res.body.results.value.firstName.should.equal('Vasiliy'))
      .end(done)
  })
});

describe('Update non admin user', function() {
  let userUsual;
  let secondUser;
  let token;
  before(async () => {
    userUsual = await userFactory.user(false);
    secondUser = await userFactory.user(false);  
    token = await auth.signinAsRoot(request,userUsual);
  })
  it('should return some information', done => {
    request.put(`/api/v1/users/${secondUser._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userUsual)
      .expect(403) 
      .end(done)
  })
});

describe('Update non admin user', function() {
  let userUsual;
  let task;
  let token;
  before(async () => {
    userUsual = await userFactory.user(false);
    task = await taskFactory.task(userUsual,[userUsual._id]);  
    token = await auth.signinAsRoot(request,userUsual);
  })
  it('should return some information', done => {
    request.post(`/api/v1/tasks/`)
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect(403) 
      .end(done)
  })
});

describe('Update non admin user', function() {
  let userUsual;
  let task;
  let token;
  before(async () => {
    userUsual = await userFactory.user(true);
    task = await taskFactory.task(userUsual,[userUsual._id]);  
    token = await auth.signinAsRoot(request,userUsual);
    console.log(task.title);
    task.title = 'Issue';
    console.log(task.title);
  })
  it('should return some information', done => {
    request.put(`/api/v1/tasks/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect((res) => {return res.body.results.value.title.should.equal('Issue')}) 
      .end(done)
  })
});

describe('Update non admin user', function() {
  let userUsual;
  let task;
  let token;
  let staff;
  let length;
  before(async () => {
    adminUser = await userFactory.user(true);
    userUsual = await userFactory.user(false);
    
    staff = await userFactory.user(true);
    task = await taskFactory.task(adminUser,[adminUser._id,userUsual._id]);  
    length = task.participatorIds.length;
    token = await auth.signinAsRoot(request,adminUser);

  })
  it('should return some information', done => {
    request.post(`/api/v1/tasks/${task._id}/participators/${staff._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => res.body.results.value.participatorIds.length.should.equal(length+1)) 
      .end(done)
  })
});

describe('Update non admin user', function() {
  let userUsual;
  let task;
  let token;
  let staff;
  let length;
  before(async () => {
    userUsual = await userFactory.user(false);
    staff = await userFactory.user(false);
    task = await taskFactory.task(userUsual,[userUsual._id]);  
    length = task.participatorIds.length;
    token = await auth.signinAsRoot(request,userUsual);
  })
  it('should return some information', done => {
    request.post(`/api/v1/tasks/${task._id}/participators/${staff._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403) 
      .end(done)
  })
});