const http = require('http')
const fs = require('fs')
const winston = require('winston')
const formBody = require("body/form")
const port = 3000
const username = 'Alina Arlova'

winston.configure({
    transports: [
      new (winston.transports.File)({ filename: 'logFile.log' })
    ]
  });

const formHandler = (request, response) => {
  formBody(request, response, (error, body) => {
    winston.log('info', 'postHandler')
    response.end(`My name is ${body.firstName} ${body.lastName}`)
  })
}

const rootHandler = (request, response) => {
  winston.log('info', 'getRequestHandler')
  response.end('Hello statup Summer')
}

const infoHandler = (request, response) => {
  winston.log('info', 'getRequestHandler')
  response.end(`My name is ${username}`)
}

const htmlHandler = (request, response) => {
  const filePath = './public/index.html';
  const stat = fs.statSync(filePath);

  response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(response);
}

const imageHandler = (request, response) => {
  http.get("http://usa.sae.edu/assets/Campuses/New-York/2015/New_York_City_view.jpg", (getRes) => { getRes.pipe(response) })
}

const requestHandler = (request, response) => {
  console.log(request.url)

  switch (request.method) {
    case 'GET':
      if (request.url === '/') {
        rootHandler(request, response)
      } else if (request.url === '/info') {
        infoHandler(request, response)
      } else if (request.url === '/index.html') {
        htmlHandler(request, response)
      } else if (request.url === '/internet-file') {
        imageHandler(request, response)
      }
      break
    case 'POST':
      if (request.url === '/user') {
        formHandler(request, response)
      }
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('server error', err)
  }
  console.log(`server is listening on port ${port}`)
})
