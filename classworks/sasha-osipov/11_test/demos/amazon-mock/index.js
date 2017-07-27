const path = require('path')
const mock = require('mock-require')
const rimraf = require('rimraf')
const AWSMock = require('mock-aws-s3')
const fs = require('fs')

const AWSMock2 = require('./amazonS3/mock')

// set amazon mock
mock('aws-sdk', AWSMock2)

let bucketsPath = path.resolve('./tmp/buckets')
rimraf.sync(bucketsPath)
AWSMock.config.basePath = bucketsPath

// ----------------------------------------

const amazonHelper = require('./amazonS3.helper')

const stream = fs.createReadStream('./image.jpg')

const uploadFile = async () => {
	let result = await amazonHelper.uploadFile('new_image.jpg', stream)
	console.log(result)
}

uploadFile()
