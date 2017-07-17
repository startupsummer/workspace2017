const fs = require('fs')

const stream = fs.createReadStream('./file.txt')

let data  = ''
stream.on('data', (streamData) => {
  data += streamData.toString('utf8')
})

stream.on('end', () => {
  console.log(data)
})
