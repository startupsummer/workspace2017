const http = require('http');
const port = 3000;
const fs = require('fs');
/*const logger = require('logger').createLogger('./fileForLog.log');*/
let winston = require('winston');
let formBody = require('body/form');

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: './fileForLog.log' })
  ]
});

const postHandler = (request, response) => {
  formBody(request, response, function (err, body) {
    if (err) {
      response.statusCode = 500;
      return response.end("NO U");
    }
    response.end(`My name is ${body.firstName} ${body.lastName}!`);
  })
};

const getHandler = (require, response) => {
  response.end('Hello, Paralect Startup Summer!');
};

const getHandlerInfo = (require, response) => {
  /*logger.info(require.url);*/
  winston.log('info', require.url);
  response.end('Hello, my name is Victoria!');
};

const getHandlerFile = (require, response) => {
  fs.readFile('./public/index.html', (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    response.end(result);
  });
};

const requestHandler = (request, response) => {
  console.log(request.url);

  switch (request.method) {
    case 'GET':

      if (request.url === '/') {
        getHandler(request, response);
      } else if (request.url === '/info') {
        getHandlerInfo(request, response);
      } else if (request.url === '/index.html') {
        getHandlerFile(request, response);
      } else if (request.url === '/internet-file') {
        http.get('http://www.google.by/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', (getResponse) => {
          getResponse.pipe(response);
        })
      }

      break;

    case 'POST':
      if (request.url === '/submit-form') {
        postHandler(request, response);
      }
      break;
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});