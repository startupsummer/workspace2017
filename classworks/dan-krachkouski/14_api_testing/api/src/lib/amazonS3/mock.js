const MockAWS = require('mock-aws-s3')
const promisifyAll = require('bluebird').promisifyAll

class MockS3 {
  constructor (options) {
    this.mock = new MockAWS.S3(options)
    promisifyAll(this.mock)
  }

  upload (search, options, callback) {
    if (callback) {
      this.mock.upload(search, options, callback)
    } else {
      return {
        promise: () => this.mock.uploadAsync(search, options)
      }
    }
  }

  getObject (search, callback) {
    if (callback) {
      this.mock.getObject(search, callback)
    } else {
      return {
        promise: () => this.mock.getObjectAsync(search)
      }
    }
  }

  delete (key) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1                       delerte')
    if (typeof key === 'string') {
      let params = {
        Bucket: this.bucket,
        Key: key
      }
      return this.mock.deleteObject(params).promise()
    } else if (key instanceof Array) {
      let params = {
        Bucket: this.bucket,
        Delete: {
          Objects: key.map(deleteKey => ({
            Key: deleteKey
          }))
        }
      }
      return this.mock.deleteObjects(params).promise()
    }
  }
}

exports.S3 = MockS3
