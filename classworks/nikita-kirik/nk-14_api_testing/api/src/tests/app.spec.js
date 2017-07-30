const mock = require('./mock')
mock.setAmazonMock();

const supertest = require('supertest')
const app = require('../app.js')
const request = supertest.agent(app.listen())

const taskTest = require('./resources/task/index')
const staffTest = require('./resources/staff/index')
const amazonTest = require('./resources/task/files/amazonIntegrationTest')

describe('TEST ', () => {

  describe('for REST api', () => {
    describe('#Test task', () => {
      taskTest.test(request)
    })

    describe('#Test staff', () => {
      staffTest.test(request)
    })
  })

  describe('for Amazon S3 service', () => {
    amazonTest.test(request)
  })
})
