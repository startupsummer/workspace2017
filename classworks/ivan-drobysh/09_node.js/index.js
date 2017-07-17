const http = require('http')
const port = 3000;
const fs = require('fs')
const sharp = require('sharp');
const winston = require('winston');
const Busboy = require('busboy');

winston.configure({
    transports: [
      new (winston.transports.File)({ filename: 'info.log' })
    ]
  });

const postHandler = (request, response) => {
  let body = '';

  request.on('data', data => {
    body += data;
  });

  request.on('end', () => {
    let args = body.split('&');
    let argum = [];
    for(let i = 0; i < args.length; i++) {
      argum[i] = args[i].split('=');
    }
    switch (request.url) {
    case '/info':
      let firstName,  lastName;
      for(let i = 0; i < args.length; i++) {
        if( argum[i][0] === 'firstName')
         firstName = argum[i][1];
        if( argum[i][0] === 'lastName')
        lastName = argum[i][1];
      }
      winston.log('info', 'POST /info');
      response.end(`Hello my name is ${firstName} ${lastName}`);
      break;
    case '/imageS':
      response.end('The image is successfully loaded');
    break;
    }
  });
  if(request.url === '/image') {
    let busboy = new Busboy({ headers: request.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let saveTo = './img.jpg';
      file.pipe(fs.createWriteStream(saveTo));
    });

    request.pipe(busboy);
  }

}

const getHandler = (request, response) => {
  switch (request.url) {
    case '/':
      winston.log('info', 'GET /');
      response.end('Hello Startup Summer');
      break;
    case '/info':
      winston.log('info', 'GET /info');
      response.end(`Hello my name is ${firstName} ${lastName}`);
      break;

    case '/index.html':
      fs.readFile('./index.html', (err, data) => {
        if (err)
          throw err;

        winston.log('info', 'GET /index.html');
        response.end(data);
      });
      break;
    case '/index.css':
      fs.readFile('./index.css', (err, data) => {
        if (err)
          throw err;
        winston.log('info', 'GET /index.css');
        response.end(data);
      });
      break;
    case '/image':

      sharp('./img.jpg').
      toBuffer()
      .then( data => {
        winston.log('info', 'GET /image');
        response.end(data);
      })
      .catch( err => console.log(err.message));

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
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})
