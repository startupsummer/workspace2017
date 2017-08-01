const AWS = require('aws-sdk')

class AmazonS3 {
  constructor (config = {}) {
    this.config = config
    this.bucket = config.bucket
    this.maxFileSizeInBytes = config.maxFileSizeInBytes

    this.s3 = new AWS.S3(config)
  }

  upload (key, body) {
    let params = {
      Bucket: this.bucket,
      Key: key,
      Body: body
    }
    return this.s3.upload(params).promise()
  }

  delete (key) {
    if (typeof key === 'string') {
      let params = {
        Bucket: this.bucket,
        Key: key
      }
      return this.s3.deleteObject(params).promise()
    } else if (key instanceof Array) {
      let params = {
        Bucket: this.bucket,
        Delete: {
          Objects: key.map(deleteKey => ({
            Key: deleteKey
          }))
        }
      }
      return this.s3.deleteObjects(params).promise()
    }
  }

  download (key) {
    let params = {
      Bucket: this.bucket,
      Key: key
    }
    return this.s3.getObject(params).promise()
  }
}

module.exports = AmazonS3
