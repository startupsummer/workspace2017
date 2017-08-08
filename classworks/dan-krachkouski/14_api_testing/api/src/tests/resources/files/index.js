const fs = require('fs')
const path = require('path')

const staffFactory = require('tests/resources/staff/staff.factory')
const staffService = require('resources/staff/staff.service')

const tasksFactory = require('tests/resources/tasks/tasks.factory')
const tasksService = require('resources/tasks/tasks.service')

// const { amazonS3 } = require('infrastructure/helpers')

const auth = require('tests/resources/auth')

const config = require('config')

require('chai').should()

module.exports = (request) => {
  let token = null
  let admin = null
  let task = null

  describe('> Files', () => {
    before(async () => {
      await Promise.all([
        staffService.write.remove({}),
        tasksService.write.remove({})
      ])

      admin = await staffFactory.getAdmin()
      task = await tasksFactory.getTask(admin._id)

      token = await auth.signinAsRoot(request, admin, 'admin')
    })

    it('should get status 200 after file upload', async () => {
      const image = fs.createReadStream(path.join(__dirname, './image.jpg'))
      return request.put(`${config.apiPrefix}/tasks/${task._id}/files`)
        .set({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'image/jpeg'
        })
        .attach('image', image)
        .expect(200)
    })

    it('should download a file', async () => {
      return request.get(`${config.apiPrefix}/tasks/${task._id}/files`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .expect(200)
        .expect((res) => {
          res.text.length.should.be.gt(0)
        })
    })

    it('should delete a file', async () => {
      return request.delete(`${config.apiPrefix}/tasks/${task._id}/files`)
        .set({
          'Authorization': `Bearer ${token}`
        })
        .expect(200)
        .expect((res) => {
          console.log(res.body.results.value)
        })
    })
  })
}
