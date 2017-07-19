const http = require('http')
const fs = require('fs')
const Log = require('log')
const formBody = require('body/form')

let streamLog = fs.createWriteStream('./file.log')
let log = new Log('info', streamLog)

const port = 3000
const username = 'Hodor'

const requestHandler = (request, response) => {
  log.info(request.url)

  switch (request.method) {
    case 'GET':
      getHandler(request, response)
      break

    case 'POST':
      postHandler(request, response)
      break
  }
}

const getHandler = (request, response) => {
  switch (request.url) {
    case '/':
      response.end('Hello Startup Summer!')
      break

    case '/info':
      response.end(`Hello. My name is ${username}`)
      break

    case '/index.html':
      filePath = `./public/${request.url}`
      fs.readFile(filePath, (error, content) => {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(content, 'utf-8')
      })
      break
    
    case '/internet-file':
      http.get(
        "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", 
        (getResponse) => getResponse.pipe(response)
      )
  }
}

const postHandler = (request, response) => {
  switch (request.url) {
    case '/data':
      const send = (err, body) =>
        response.end(`My name is ${body.firstname} ${body.lastname}`)

      formBody(request, {}, send)
      break
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
