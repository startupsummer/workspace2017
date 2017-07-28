const supertest = require('supertest');
const app = require('../app')
const userTest = require('tests/resources/users')
const taskTest = require('tests/resources/tasks')

const request = supertest.agent(app.listen())

describe('Tests', () => {
  userTest(request)
  taskTest(request)
})