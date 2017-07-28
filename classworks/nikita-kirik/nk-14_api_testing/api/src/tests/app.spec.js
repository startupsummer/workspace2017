const supertest = require('supertest')
const app = require('../app.js')
const request = supertest.agent(app.listen())

const taskTest = require('./resources/task/index')
const staffTest = require('./resources/staff/index')

const mock = require('./mock')
const s3 = require('../lib/amazonS3')
const fs = require('fs')



describe('Tests'), () => {


  describe('for REST api', () => {

    describe('#Test task', () => {
      taskTest.test(request)
    })
    describe('#Test staff', () => {
      staffTest.test(request)
    })
  })

  describe('for Amazon S3 service', () => {
    before(async () => {

      mock.setAmazonMock()

    }


    beforeEach(async () => {
      await staffWriteService.remove();
      await taskWriteService.remove();

      admin = await StaffFactory.admin();
      token = await tokenFact.signinAsRoot(request, admin);
      const task = await TaskFactory.task(admin._id);
    })

    describe('#Request', () => {
      it('Update file', done => {
        request.put(`/api/v1/tasks/${task._id}/files`)
        .set('Authorization', `Bearer ${token}`)
        .attach('image',  './image.jpg')
        .expect(200)
        .end((err, resp) => {
          if(err) return done(err)
          // resp.body.results.value.title.should.be.equal('Learn testing');
          // resp.body.results.value.description.should.be.equal('Learn how to write tests for REST api server.');
          done();
        })
      })
    })

  })

})
