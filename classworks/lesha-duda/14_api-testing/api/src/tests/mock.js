const mock = require('mock-require')
const rimraf = require('rimraf')
const AWSMock = require('mock-aws-s3')

const AWSMock2 = require('../lib/amazonS3/mock')

exports.setAmazonMock = () => {
  mock('aws-sdk', AWSMock2)
  rimraf.sync('/tmp/buckets')
  AWSMock.config.basePath = '/tmp/buckets/'
}

exports.setSlackMock = () => {
  mock('../infrastructure/helpers/slack.helper', require('../infrastructure/mocks/slack.mock'))
}
