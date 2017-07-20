const http = require('http')
const port = 3000;
const fs = require('fs');
const winston = require('winston');
const Busboy = require('busboy');
let firstName = '', lastName = '';

const parseBody = (body) => {
  let args = body.split('&');
  let argums = [];
  for(let i = 0; i < args.length; i++) {
    argums[i] = args[i].split('=');
  }
  return argums;
}

winston.configure({
    transports: [
      new (winston.transports.File)({ filename: 'info.log' })
    ]
  });

const handlePostRequests = (request, response, data) => {
  switch (request.url) {
  case '/info':
    for(let i = 0; i < args.length; i++) {
      if( argum[i][0] === 'firstName')
       firstName = argum[i][1];
      if( argum[i][0] === 'lastName')
      lastName = argum[i][1];
    }
    response.end(`Hello my name is ${firstName} ${lastName}`);
    break;
  }
}

const postHandler = (request, response) => {
  if(request.url === '/image') {
    let busboy = new Busboy({ headers: request.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let saveTo = './img.jpg';
      file.pipe(fs.createWriteStream(saveTo));
    });
    request.pipe(busboy);
    busboy.on('finish', () => {
      fs.readFile('./img.jpg', (err, data) => {
        if (err)
          throw err;

        response.end(data);
      });
      });
    } else {
    let body = '';

    request.on('data', data => {
      body += data;
    });

    request.on('end', () => {
      let argum = parseBody(body);
      handlePostRequests(request, response, argum);
    });
  }
}

const getHandler = (request, response) => {
  switch (request.url) {
    case '/':
      response.end('Hello Startup Summer');
      break;
    case '/info':
      response.end(`Hello my name is ${firstName} ${lastName}`);
      break;

    case '/index.css':
      fs.readFile('./index.css', (err, data) => {
        if (err)
          throw err;
        response.end(data);
      });
      break;
    case '/index.html':
      fs.readFile('./index.html', (err, data) => {
        if (err)
          throw err;

        response.end(data);
      });
      break;
    case '/image':
    fs.readFile('./img.jpg', (err, data) => {
      if (err)
        throw err;

      response.end(data);
    });
    break;
  }
}

const requestHandler = (request, response) => {
  switch (request.method) {
    case 'GET':
      getHandler(request, response);
      break;

    case 'POST':
      postHandler(request, response);
      break;
  }
  loggerHandler(request, response);
}
const loggerHandler = (request) => {
    winston.log('info', 'logger handler', { anything: `require page: ${request.url}`});
}
const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})
