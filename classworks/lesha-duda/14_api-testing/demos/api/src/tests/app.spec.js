const supertest = require('supertest')
const assert = require('assert')
const app = require('../app') 
const request = supertest.agent(app.listen())
const staffFactory = require('tests/resources/staff/userFactory')
const taskFactory = require('tests/resources/task/taskFactory')
const service = require('resources/staff/staff.service')
const auth = require('./resources/auth')

let admin, user1, user2
let tasks = []


const func = async = () => {
  admin = staffFactory.admin()
  user1 = staffFactory.user()
  user2 = staffFactory.user()
  tasks.push(taskFactory.publicTask(admin._id, [1]))
  tasks.push(taskFactory.publicTask(admin._id, [1, 2, 3]))
  tasks.push(taskFactory.publicTask(admin._id, [1]))
}
func()


describe('User', function() {
  let tokenAdmin, tokenUser1

  before(async () => {
    tokenAdmin = await auth.signinAsRoot(request, admin)
    tokenUser1 = await auth.signinAsRoot(request, user1)
  })

  it('should return task information', done => {
    request.get('/api/v1/tasks')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200)
      .end(done)
  })

  it('should return user update his firstname/lastname', done => {
    request.put(`/api/v1/staff/${user1._id}`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ 
        firstName: 'test',
        lastName: 'test',
        password: 'qwerty',
      })
      .expect((res => assert(user1, res))) 
      .end(done)
  })

  it('should return error 403, user1 update user2 firstname/lastname', done => {
    request.put(`/api/v1/staff/${user2._id}`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ 
        firstName: 'testChange',
        lastName: 'testChange',
        password: 'qwerty',
      })
      .expect(403) 
      .end(done)
  })

  it('non admin staff tries to create a task, get error 403', done => {
    request.post(`/api/v1/tasks/`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .expect(403)
      .end(done)
  })

  it('admin can successfully update the task, in response updated task', done => {
    request.put(`/api/v1/${tasks[0]._id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        title: 'test title',
        description: 'test description',
      })
      .expect((res => assert(res, tasks[0])))
      .end(done)
  })

  it('admin can add any staff to the list of participators of the task', done => {
    request.post(`/api/v1/tasks/${tasks[0]._id}/participators/${user1._id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        participatorIds: user2._id,
      })
      .expect((task => assert(tasks[0]._id, task)))
      .end(done)
  })

    it('Non admin staff member tries to add another staff to the task he gets an error 403', done => {
    request.post(`/api/v1/tasks/${tasks[1]._id}/participators/${user2._id}`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({
        participatorIds: user2._id,
      })
      .expect((res => console.log()))
      .end(done)
  })


 })