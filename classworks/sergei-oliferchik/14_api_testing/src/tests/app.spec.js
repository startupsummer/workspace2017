const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen())

const staffTests = require('./resources/staffTests')
const tasksTests = require('./resources/tasksTests')


staffTests(request)
tasksTests(request)
