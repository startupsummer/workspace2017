const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen());
const testsTasks = require('./resources/tasks/tests');
const testsUsers = require('./resources/staff/tests');

testsTasks.start(request);
testsUsers.start(request);
