const CryptoJS = require('crypto-js')

const secretKey = 'secret_key'

exports.getHash = (password, salt) => {
  salt = salt || ''
  let hash = CryptoJS.SHA256(salt + password)
  return hash.toString(CryptoJS.enc.Base64)
}

exports.encrypt = (plainText) => {
  let C = CryptoJS
  plainText = C.enc.Utf8.parse(plainText)

  let key = C.enc.Base64.parse(secretKey)
  var aes = C.algo.AES.createEncryptor(key, {
    mode: C.mode.CBC,
    padding: C.pad.Pkcs7,
    iv: key
  })
  var encrypted = aes.finalize(plainText)
  return C.enc.Base64.stringify(encrypted)
}

exports.decrypt = (encryptedText) => {
  let C = CryptoJS
  encryptedText = C.enc.Base64.parse(encryptedText)

  let key = C.enc.Base64.parse(secretKey)
  var aes = C.algo.AES.createDecryptor(key, {
    mode: C.mode.CBC,
    padding: C.pad.Pkcs7,
    iv: key
  })
  var decrypted = aes.finalize(encryptedText)
  return C.enc.Utf8.stringify(decrypted)
}
