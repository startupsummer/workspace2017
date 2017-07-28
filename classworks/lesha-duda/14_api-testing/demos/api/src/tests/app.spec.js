const mock = require('./mock') 
mock.setAmazonMock()

const supertest = require('supertest')
const assert = require('assert')
const app = require('../app') 
const request = supertest.agent(app.listen())
const staffFactory = require('tests/resources/staff/userFactory')
const taskFactory = require('tests/resources/task/taskFactory')
const service = require('resources/staff/staff.service')
const auth = require('./resources/auth')
const writeServiceStaff = require('resources/staff/staff.service')
const writeServiceTask = require('resources/tasks/tasks.service')


const func = () => new Promise(async (resolve) => {
  admin = await staffFactory.admin()
  user1 = await staffFactory.user()
  user2 = await staffFactory.user()
  tasks.push(await taskFactory.publicTask(admin._id, [1]))
  tasks.push(await taskFactory.publicTask(admin._id, [1, 2, 3]))
  tasks.push(await taskFactory.publicTask(admin._id, [1]))
  resolve()
})

// const superAdmin = staffFactory.admin()
// const taskMock = taskFactory.publicTask(superAdmin._id, [1])
// const tokenSuperAdmin = auth.signinAsRoot(request, superAdmin)

let admin, user1, user2
let tasks = []
let tokenAdmin, tokenUser1


describe('User', function() {
  beforeEach(async () =>  {
    await func()
    tokenAdmin = await auth.signinAsRoot(request, admin)
    tokenUser1 = await auth.signinAsRoot(request, user1)
  })

  afterEach(async () => {
    await writeServiceStaff.write.remove({})
    await writeServiceTask.write.remove({})
    admin, user1, user2, tokenAdmin, tokenUser1 = undefined
    tasks = []
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

  it('Non admin staff member tries to add another staff to the task, in response get error 403', done => {
    request.post(`/api/v1/tasks/${tasks[1]._id}/participators/${user2._id}`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({
        participatorIds: user2._id,
      })
      .expect(403)
      .end(done)
  })

  it('Mock af Amazon S3 service, uploading and updating', done => {    
    request.put(`/api/v1/tasks/${tasks[0]._id}/files/`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .set({
        'Content-type': '/home/student2/Desktop/test/workspace2017/classworks/lesha-duda/14_api-testing/demos/api/src/image.jpg'
      })
      .attach('DANKR', '/home/student2/Desktop/test/workspace2017/classworks/lesha-duda/14_api-testing/demos/api/src/image.jpg')
      .then(() => {
        request.get(`/api/v1/tasks/${tasks[0]._id}/files/`)
          .set('Authorization', `Bearer ${tokenAdmin}`)
          .expect(200)
          .end(done)
      })
  })

  //   it('Mock af Amazon S3 service, delete', done => {    
  //   request.put(`/api/v1/tasks/${tasks[0]._id}/files/`)
  //     .set('Authorization', `Bearer ${tokenAdmin}`)
  //     .set({
  //       'Content-type': '/home/student2/Desktop/test/workspace2017/classworks/lesha-duda/14_api-testing/demos/api/src/image.jpg'
  //     })
  //     .attach('DANKR', '/home/student2/Desktop/test/workspace2017/classworks/lesha-duda/14_api-testing/demos/api/src/image.jpg')
  //     .then(() => {
  //       request.delete(`/api/v1/tasks/${tasks[0]._id}/files/`)
  //       .set('Authorization', `Bearer ${tokenAdmin}`)
  //       .expect((res) => console.log())
  //       .end(done)
  //     })
  // })
 })
