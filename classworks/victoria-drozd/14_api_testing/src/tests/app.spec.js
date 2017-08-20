require('app-module-path').addPath(`${__dirname}/../`)
const testStaff = require('./resources/staff')
const testTasks = require('./resources/tasks')
const supertest = require('supertest')
const app = require('../app')

const request = supertest.agent(app.listen())

testStaff(request)
testTasks(request)
