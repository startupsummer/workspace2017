const supertest = require('supertest')
const app = require('../app')
const request = supertest.agent(app.listen())

const staffTest = require('tests/resources/staff')
const tasksTest = require('tests/resources/tasks')

describe('Tests', () => {
  staffTest(request)
  tasksTest(request)
})
