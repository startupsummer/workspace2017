const _ = require('lodash')
const path = require('path')
const fs = require('fs')

let env = process.env.NODE_ENV || 'development'

let base = {
  env: env,
  mongo: {
    connection: 'connection string'
  },
  apiUrl: 'http://localhost:5001',
  apiPrefix: '/api/v1',
  secret: 'secret',
  audience: 'test.api',
  logType: 'dev',
  port: process.env.PORT || 5001,
  amazonS3: {
    secretAccessKey: 'secret access key',
    accessKeyId: 'access key id',
    bucket: 'TEST_API',
    maxFileSizeInBytes: 10485760,
    region: 'us-east-1'
  }
}

base = _.merge(base, require(`./${env}.js`) || {})

let loadLocalConfig = (name) => {
  let localConfigPath = path.join(__dirname, name)
  if (fs.existsSync(localConfigPath)) {
    base = _.merge(base, require(localConfigPath))
    console.log(`loaded ${localConfigPath} config`)
  }
}

// local file can be used to customize any config values during development
if (base.env === 'test') {
  loadLocalConfig('test-local.js')
} else {
  loadLocalConfig('local.js')
}

module.exports = base
