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

  deleteObject (search, callback) {
    if (callback) {
      this.mock.deleteObject(search, callback)
    } else {
      return {
        promise: () => this.mock.deleteObjectAsync(search)
      }
    }
  }

  deleteObjects (search, callback) {
    if (callback) {
      this.mock.deleteObjects(search, callback)
    } else {
      return {
        promise: () => this.mock.deleteObjectsAsync(search)
      }
    }
  }

  copyObject (search, callback) {
    if (callback) {
      this.mock.copyObject(search, callback)
    } else {
      return {
        promise: () => this.mock.copyObjectAsync(search)
      }
    }
  }

}

exports.S3 = MockS3
