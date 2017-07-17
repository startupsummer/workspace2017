const fs = require('fs')

fs.readFile('./file.txt', (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result.toString('utf8'))
})
