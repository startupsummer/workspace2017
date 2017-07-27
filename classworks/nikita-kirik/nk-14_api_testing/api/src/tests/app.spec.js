const supertest = require('supertest')
const app = require('../app.js')
const request = supertest.agent(app.listen())

const taskTest = require('./resources/task/index')
const staffTest = require('./resources/staff/index')

describe('Tests for REST api', () => {

  describe('#Test task', () => {
    taskTest.test(request)
  })
  describe('#Test staff', () => {
    staffTest.test(request)
  })
})
