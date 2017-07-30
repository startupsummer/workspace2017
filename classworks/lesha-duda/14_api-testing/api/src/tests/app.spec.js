const mock = require('./mock') 
mock.setAmazonMock()
const chai = require('chai')
const app = require('../app')
const request = supertest.agent(app.listen()) 
const taskTest = require('tests/resources/task/index')
const staffTest = require('tests/resources/staff/index')
const amazonTest = require('tests/resources/amazon/index')


chai.should();

staffTest(request)
taskTest(request)
amazonTest(request)