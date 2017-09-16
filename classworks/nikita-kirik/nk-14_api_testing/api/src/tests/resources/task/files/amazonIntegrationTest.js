const taskFactory = require('tests/resources/task/task.factory')
const staffFactory = require('tests/resources/staff/staff.factory')
const tokenFact = require('tests/resources/auth.js')

const staffService = require('resources/staff/staff.service')
const staffWriteService = staffService.write
const taskService = require('resources/tasks/tasks.service')
const taskWriteService = taskService.write

const path = require('path')
const chai = require('chai')
chai.use(require('chai-fs'))

const should = chai.should()

module.exports.test = (request) => {

  let token;
  let admin;
  let task;
  let imgName1 = 'countryside.jpg', imgName2 = 'van-dongen-girl.jpg';
  let checkingDirectory = '/tmp/buckets/TEST_API/files';

  describe('#Request ', () => {
    before(async () => {
      await staffWriteService.remove();
      await taskWriteService.remove();

      admin = await staffFactory.admin();
      token = await tokenFact.signinAsRoot(request, admin);
      task = await taskFactory.task(admin._id);
    })

    after(async () => {
      await staffWriteService.remove();
      await taskWriteService.remove();
    })

    it('Upload image', done => {
      request.put(`/api/v1/tasks/${task._id}/files/`)
      .set('Authorization', `Bearer ${token}`)
      .attach('QWERT', path.resolve(__dirname, imgName1))
      .expect(200)
      .end((err, resp) => {
        if(err) return done(err)
        // path.resolve(checkingDirectory, imgName1).should.be.a.file()
        // path.resolve(checkingDirectory , './').should.be.a.directory().and.equal(path.resolve(__dirname, './'))
        path.resolve(checkingDirectory , resp.body.generatedFileName).should.be.a.file().and.equal(path.resolve(__dirname, imgName1))
        resp.body.newTask.results.value.should.have.property('fileFileName')
        done();
      })
    })

    it('Update image', done => {
      request.put(`/api/v1/tasks/${task._id}/files/`)
      .set('Authorization', `Bearer ${token}`)
      .attach('QWERT', path.resolve(__dirname, imgName2))
      .expect(200)
      .end((err, resp) => {
        if(err) return done(err)
        path.resolve(checkingDirectory , resp.body.generatedFileName).should.be.a.file().and.equal(path.resolve(__dirname, imgName2))
        resp.body.newTask.results.value.should.have.property('fileFileName')
        done();
      })
    })

    it('Delete image', done => {
      request.delete(`/api/v1/tasks/${task._id}/files/`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, resp) => {
        if(err) return done(err)
        path.resolve(checkingDirectory , './').should.be.a.directory().and.empty
        should.equal(resp.body.results.value.fileFileName, null)
        done()
      })
    })

  })

}
