const http = require('http')
const fileSystem = require('fs')
const path = require('path')
const formBody = require("body/form")
const request = require('request')
const port = 3000
const username = 'Lesha'


let winston = require('winston');
winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'logging.log' })
    ]
});

const getHandlerPageNotExist = (request, response) => {
    winston.log('info', 'getHandlerPageNotExist', { anything: `require page: ${request.url}`});
    response.end("Ooops, sorry this page isn't exist")
}

const getHandlerHome = (request, response) => {
    winston.log('info', 'getHandlerHome', { anything: `require page: ${request.url}`});
    response.end(`Hello Startup Summer`)
}

const getHandlerInfo = (request, response) => {
    winston.log('info', 'getHandlerInfo', { anything: `require page: ${request.url}`});
    response.end(`Hello. My name is ${username}`)
}

const getInternetFile = (request, response) => {
    request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", getRes = ((res) => res.pipe(response)))
}

const getHandlerIndex = (request, response) => {
    let readStream = fileSystem.createReadStream('index.html');
    readStream.pipe(response);
}

const postHandler = (request, response) => {
    console.log(request.url)
    if(request.url === 'sendName') {
        formBody(request, {}, send = ((err, body) => response.end(`My name is ${body.firstName} ${body.lastName}`)))
    }
}

const getHandler = (request, response) => {
    winston.log('info', 'getHandler is ok', { anything: `require page: ${request.url}`});

    if(request.url === '/') {
        getHandlerHome(request, response)
    }
    else if(request.url === '/info') {
        getHandlerInfo(request, response)
    }
    else if(request.url === '/index.html') {
        getHandlerIndex(request, response)
    }
    else if(request.url === '/internet-file') {
        getInternetFile(request, response);
    }
    else {
       getHandlerPageNotExist(request, response)
    }
}

const requestHandler = (request, response) => {
    winston.log('info', 'requestHandler is ok', { anything: `request: ${request.url}`});

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
    if(err) {
        winston.log('Error', 'Listening server error', { anything: `${err}` });
        return console.log(`Error: ${err}`)
    }

    winston.log('info', 'Listen server is ok', { anything: `Server listening at port: ${port}`});

    console.log(`Server listening at port: ${port}`)
})