const config = {
  secretAccessKey: 'secret access key',
  accessKeyId: 'acess key id',
  bucket: 'STARTUP_SUMMER',
  maxFileSizeInBytes: 10485760,
  region: 'us-east-1'
}

const S3 = require('./amazonS3')
const s3 = new S3(config)

const DEFAULT_S3_FILES_FOLDER = 'mock'

/**
 * Get buffer of the file from stream
 * @param {Stream} stream
 * @return {Promise}
 */
const getFileBuffer = stream => {
  let promise = new Promise((resolve, reject) => {
    let dataLength = 0

    let data = []

    stream
      .on('data', (chunk) => {
        dataLength += chunk.length
        data.push(chunk)
      })
      .on('error', (err) => {
        reject(err)
      })
      .on('end', () => {
        let buffer = Buffer.concat(data)
        resolve({
          buffer: buffer,
          length: dataLength
        })
      })
  })

  return promise
}

/**
 * Upload file to amazon 3s
 * @param {String} fileName
 * @param {Stream} stream
 * @param {String} folder
 */
exports.uploadFile = async (fileName, stream, folder = DEFAULT_S3_FILES_FOLDER) => {
  let result = {
    value: {},
    error: null
  }

  let data
  try {
    data = await getFileBuffer(stream)
  } catch (err) {
    result.error = err
  }
  if (result.error) {
    return result
  }

  // check size of the file
  if (data.length > config.maxFileSizeInBytes) {
    result.error = { size: 'Please upload file of the smaller size.' }
    return result
  }

  try {
    let key = folder ? `${folder}/${fileName}` : fileName
    result.value = await s3.upload(key, data.buffer)
    result.value.size = data.length
  } catch (err) {
    result.error = err
  }
  return result
}

exports.downloadFile = async function (fileName, folder = constants.DEFAULT_S3_FILES_FOLDER) {
  let result = {
    value: {},
    error: null
  }

  try {
    let key = folder ? `${folder}/${fileName}` : fileName
    result.value = await s3.download(key)
  } catch (err) {
    result.error = err
  }
  return result
}
