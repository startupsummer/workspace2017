const config = require('config').amazonS3
const S3 = require('lib/amazonS3')

const constants = require('app.constants')

const s3 = new S3(config)

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
 * Delete file from amazon s3 storage
 * @param {String} fileName
 * @param {String} folder
 * @return {Object}
 */
exports.deleteFile = async function (fileName, folder = constants.DEFAULT_S3_FILES_FOLDER) {
  let result = {
    value: {},
    error: null
  }

  try {
    let key = folder ? `${folder}/${fileName}` : fileName
    result.value = await s3.delete(key)
  } catch (err) {
    result.error = err
  }
  return result
}

exports.deleteFiles = async (fileNames, folder = constants.DEFAULT_S3_FILES_FOLDER) => {
  let result = {
    value: {},
    error: null
  }

  let keys = fileNames.map(fileName =>
    folder ? `${folder}/${fileName}` : fileName
  )

  try {
    result.value = await s3.delete(keys)
  } catch (err) {
    result.error = err
  }
  return result
}

/**
 * Upload file to amazon 3s
 * @param {String} fileName
 * @param {Stream} stream
 * @param {String} folder
 */
exports.uploadFile = async (fileName, stream, folder = constants.DEFAULT_S3_FILES_FOLDER) => {
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

exports.copy = async (fileName, existingFileName, folder = constants.DEFAULT_S3_FILES_FOLDER) => {
  let result = {
    value: {},
    error: null
  }

  try {
    let newKey = folder ? `${folder}/${fileName}` : fileName
    let existingKey = folder ? `${folder}/${existingFileName}` : existingFileName
    result.value = await s3.copy(newKey, existingKey)
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

exports.getTemporaryLink = (
  fileName, folder = constants.DEFAULT_S3_FILES_FOLDER, expiresSeconds = 30
) => {
  return s3.getUrl(`${folder}/${fileName}`, expiresSeconds)
}
