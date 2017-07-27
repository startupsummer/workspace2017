const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen())
const {write} = require('./../resources/staff/staff.service.js')
const auth = require('./resources/auth')
const chai = require('chai')
const userTests = require('./resources/staff');
const taskTests = require('./resources/task');

chai.should();


const userFactory = require('./resources/staff/user.factory.js')
const taskFactory = require('./resources/task/task.factory.js')


userTests();
taskTests();