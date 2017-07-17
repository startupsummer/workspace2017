const http = require('http')  ;
const body = require('body/form');
const request = require('request');
const winston = require('winston');

const port = 3002;
const username = 'Natallia';
const fs = require('fs');

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'logging.log' })
  ]
});

const requestHandler = (request, response) => {
  switch (request.url) {
    case '/':
      firstHandler(request, response);
      break;
    case '/info':
      infoHandler(request, response);
      break;
    case '/index.html': 
      getFileHandler(request, response);
      break;
    case '/fullname':
      getFullnameHandler(request, response);
      break;
    case '/internet-file':
      getImageHandler(request, response);
      break;
  }
  loggerHandler(request, response);
}

const firstHandler = (request, response) => {
  response.end('Hello Startup Summer');
}

const infoHandler = (request, response) => {
  response.end(`Hello. My name is ${username}`);
}

const getFileHandler = (request, response) => {
  const stream = fs.createReadStream('./public/index.html');

  let data  = '';
  stream.on('data', (streamData) => {
    data += streamData.toString('utf8');
  })

  stream.on('end', () => {
    response.end(data);
  })
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});

const getFullnameHandler = (req, resp) => {
  const send = (err, body) => {
    resp.end(`My name is ${body.firstName} ${body.lastName}`);
  };
  body(req, {}, send);
};

const loggerHandler = (request, resp) => {
  winston.log('info', 'logger handler', { anything: `require page: ${request.url}`});
}

const getImageHandler = (req, resp) => {
  var image = request('https://static.pexels.com/photos/60224/pexels-photo-60224.jpeg');
  req.pipe(image);
  image.pipe(resp);
}

 