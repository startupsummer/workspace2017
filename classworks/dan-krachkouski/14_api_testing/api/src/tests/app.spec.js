const mock = require('./mock')
mock.setAmazonMock()

const supertest = require('supertest')
const app = require('../app')
const request = supertest.agent(app.listen())

const staffTest = require('tests/resources/staff')
const tasksTest = require('tests/resources/tasks')
const taskFilesTest = require('tests/resources/files')

describe('Api Tests', () => {
  staffTest(request)
  tasksTest(request)
  taskFilesTest(request)
})
