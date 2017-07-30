const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen())

const { tasks } = require('./resources/tasks')
const { users } = require('./resources/users')

tasks(request)
users(request)





