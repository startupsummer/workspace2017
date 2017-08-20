const supertest = require('supertest')
var path = require('path')
const app = require('app')
const assert = require('assert') 
const staffFactory = require('tests/resources/staff/userFactory')
const taskFactory = require('tests/resources/task/taskFactory')
const service = require('resources/staff/staff.service')
const auth = require('tests/resources/auth.js')
const writeServiceStaff = require('resources/staff/staff.service')



module.exports = (request) => { describe('User', function() {
    const createMockData = () => new Promise(async (resolve) => {
      admin = await staffFactory.admin()
      user1 = await staffFactory.user()
      user2 = await staffFactory.user()
      tasks.push(await taskFactory.publicTask(admin._id, [1]))
      resolve()
    })
    let admin, user1, user2
    let tokenAdmin, tokenUser1
    let tasks = []

    beforeEach(async () =>  {
      await createMockData()
      tokenAdmin = await auth.signinAsRoot(request, admin)
      tokenUser1 = await auth.signinAsRoot(request, user1)
    })

    afterEach(async () => {
      await writeServiceStaff.write.remove({})
      admin, user1, user2, tokenAdmin, tokenUser1 = undefined
    })

    it('should return 200 in response if updating and uploading file using amazon api is done successfully', done => {    
      request.put(`/api/v1/tasks/${tasks[0]._id}/files/`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .set({
          'Content-type': 'image/jpg'
        })
        .attach('Image', path.join(__dirname, './image.jpg'))
        .then(() => {
          request.get(`/api/v1/tasks/${tasks[0]._id}/files/`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(200)
            .end(done)
        })
    })
  })
}