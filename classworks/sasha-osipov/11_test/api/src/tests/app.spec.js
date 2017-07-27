const supertest = require('supertest');
const app = require('../app')
const chai = require('chai')
const request = supertest.agent(app.listen())
const { signinAsRoot } = require('./resources/auth')

chai.should()
const { addAdmin, addUser } = require('./resources/users')
const { addTask } = require('./resources/tasks')
let token, admin, user, userForKill, task

describe('Admin with tasks', function() {
    before(async () => {
        admin = await addAdmin()
        await addTask(admin._id)
        await addTask(admin._id)
        await addTask(admin._id)
        token = await signinAsRoot(request, admin)
    })
    it('should return some information', done => {
      request.get('/api/v1/tasks')
        .set('Authorization', `Bearer ${ token }`)
        .expect(200)
        .end(done)
    })
})

describe('Update himself', function() {
    before(async () => {
        user = await addUser()
        token = await signinAsRoot(request, user)
        user.firstName = 'Lol'
        user.password = '228'  
    })
    it('should return some information', done => {
      request.put(`/api/v1/staff/${ user._id }`)
        .set('Authorization', `Bearer ${ token }`)
        .send(user)
        .expect(200)
        .end(done)
    })
})

describe('Update other user', function() {
    before(async () => {
        user = await addUser()
        userForKill = await addUser()
        token = await signinAsRoot(request, user) 
        userForKill.firstName = 'kek'
        userForKill.password = '12345' 
    })
    it('should return some information', done => {
      request.put(`/api/v1/staff/${ userForKill._id }`)
        .set('Authorization', `Bearer ${ token }`)
        .send(userForKill)
        .expect(403)
        .end(done)
    })
})

describe('Try create a task', function() {
    before(async () => {
        user = await addUser()
        task = await addTask(user._id)
        token = await signinAsRoot(request, user) 
    })
    it('should return some information', done => {
      request.post(`/api/v1/tasks`)
        .set('Authorization', `Bearer ${ token }`)
        .send(task)
        .expect(403)
        .end(done)
    })
})

describe('Admin update task', function() {
    before(async () => {
        admin = await addAdmin()
        task = await addTask(admin._id)
        token = await signinAsRoot(request, admin)
        task.title = `Hello, it's me!`
    })
    it('should return some information', done => {
      request.put(`/api/v1/tasks/${ task._id }`)
        .set('Authorization', `Bearer ${ token }`)
        .send(task)
        .expect(res => {
            res.body.results.value.title.should.be.equal(task.title)
        })
        .end(done)
    })
})

describe('Admin add new user to task', function() {
    before(async () => {
        admin = await addAdmin()
        task = await addTask(admin._id)
        user = await addUser()
        token = await signinAsRoot(request, admin)
    })
    it('should return some information', done => {
      request.post(`/api/v1/tasks/${ task._id }/participators/${ user._id }`)
        .set('Authorization', `Bearer ${ token }`)
        .send(task)
        .expect(200)
        .end(done)
    })
})

describe('User try add new user to task', function() {
    before(async () => {
        user = await addUser()
        userForKill = await addUser()
        task = await addTask(admin._id)
        token = await signinAsRoot(request, user)
    })
    it('should return some information', done => {
      request.post(`/api/v1/tasks/${ task._id }/participators/${ userForKill._id }`)
        .set('Authorization', `Bearer ${ token }`)
        .send(task)
        .expect(403)
        .end(done)
    })
})








