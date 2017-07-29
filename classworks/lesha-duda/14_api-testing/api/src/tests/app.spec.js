const mock = require('./mock') 
mock.setAmazonMock()
const chai = require('chai')
const app = require('../app') 
const taskTest = require('tests/resources/task/index')
const staffTest = require('tests/resources/staff/index')
const amazonTest = require('tests/resources/amazon/index')


chai.should();

staffTest()
taskTest()
amazonTest()