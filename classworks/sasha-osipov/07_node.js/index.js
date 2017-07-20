const http = require('http')  
const fs = require('fs')
const port = 8080
const username = 'Sasha Osipov'
const winston = require('winston')
const formBody = require("body/form")

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'logger.log' })
  ]
})

const getHandler = (request, response) => {  
  winston.log('info', `${request.method} ${request.url}`)
  switch (request.url) {
    case '/':
      response.end('Hello Startup Summer')
      break
    
    case '/info':
      response.end(`Hello. My name is ${username}`)
      break

    case '/index.html':
      fs.readFile('./index.html', function read(err, data) {
        response.end(data)
      })
      break

    case '/internet-file':
      http.get("http://www.petmd.com/sites/default/files/scared-kitten-shutterstock_191443322.jpg", (getResponse) => {
        getResponse.pipe(response)
      })
      break
  }
}

const postHandler = (request, response) => {
  winston.log('info', `${request.method} ${request.url}`)
  if(request.url === '/data') {
      const send = (err, body) => response.end(`My name is ${body.firstName} ${body.lastName}`)
      formBody(request, {}, send)
  }
}

const requestHandler = (request, response) => {  
  switch (request.method) {
    case 'GET':
      getHandler(request, response)
      break

    case 'POST':
      postHandler(request, response)
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