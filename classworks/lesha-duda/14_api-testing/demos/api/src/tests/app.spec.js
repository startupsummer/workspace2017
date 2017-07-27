const supertest = require('supertest')
const assert = require('assert')
const app = require('../app') 
const request = supertest.agent(app.listen())
const staffFactory = require('tests/resources/staff/index')
const taskFactory = require('tests/resources/task/taskFactory')
const service = require('resources/staff/staff.service')
const auth = require('./resources/auth')

// const func = async () => {
//   let admin = await staffFactory.admin()
//   let tasks = await Promise.all(
//     [
//       taskFactory.privateTask(admin._id), 
//       taskFactory.publicTask(admin._id, [1, 2, 3]), 
//       taskFactory.publicTask(admin._id, [1])
//     ])

  
// }
// func()
let admin
let tasks = []
const func = async = () => {
  admin = staffFactory.admin
  tasks.push(taskFactory.publicTask(admin._id, [1]))
  tasks.push(taskFactory.publicTask(admin._id, [1, 2, 3]))
  tasks.push(taskFactory.publicTask(admin._id, [1]))
}
func()


describe('User', function() {
  let token;
  before(async () => {
    token = await auth.signinAsRoot(request, admin)
  })
  it('should return some information', done => {
    request.get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end(done)
  })
 });