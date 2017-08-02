
const mockAmazon = require('./mock');
mockAmazon.setAmazonMock();

const supertest = require('supertest');
const app = require('../app')
const request = supertest.agent(app.listen())
const chai = require('chai')
const userTests = require('./resources/staff')
const taskTests = require('./resources/task')
const amazonTests = require('./resources/amazon')

chai.should();

userTests(request);
taskTests(request);
amazonTests(request);