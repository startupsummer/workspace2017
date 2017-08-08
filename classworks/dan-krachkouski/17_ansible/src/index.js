const http = require('http')
const cow = require('cowsay')

http.createServer((request, response) => {
  const quote = cow.say({ text: 'Hello world!', f: 'whale' })
  response.end(quote)
}).listen(3000)
