const supertest = require('supertest')
const app = require('../app.js')
const request = supertest.agent(app.listen())

const taskTest = require('./resources/task/index')

console.log('HERE');
taskTest.test(request)
