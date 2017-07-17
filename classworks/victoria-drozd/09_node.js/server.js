const http = require('http');
const port = 3000;
const fs = require('fs');
const logger = require('logger').createLogger('./fileForLog.log');
let formBody = require('body/form');

const postHandler = (request, response) => {
  let body = '';

  request.on('data', data => {
    body += data;
  });

  request.on('end', () => {
    console.log(body);
  });
};

const getHandler = (require, response) => {
  logger.info(require.url);
  response.end('Hello, Paralect Startup Summer!');
};

const getHandlerInfo = (require, response) => {
  logger.info(require.url);
  response.end('Hello, my name is Victoria!');
};

const getHandlerFile = (require, response) => {
  fs.readFile('./public/index.html', (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    logger.info(require.url);
    response.end(result);
  });
};

let getHandlerForm = (require, response) => {
  response.end(`My name is ${require.param('firstname')} ${require.param('lastName')}`);
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
      } else {
        getHandlerForm(request, response);
      }

      break;

    case 'POST':
      postHandler(request, response);
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