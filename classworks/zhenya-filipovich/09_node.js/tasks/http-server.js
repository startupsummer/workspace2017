const http = require('http');
const fs = require('fs');
const download = require('image-downloader');
const formidable = require('formidable');
const logger = require('logger').createLogger('./development.log');
const port = 8080;

const username = 'Zhenya Filippovich';

const getHandler = (request, response) => {
  response.end('Hello Startup Summer');
};

const getUser = (request, response) => {
  response.end(`Hello! My name is ${username}!`); 
};

const showFormPage = (request, response) => {
  fs.readFile('./public/index.html', (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    response.writeHeader(200, {'Content-Type': 'text/html'}); 
    response.end(result); 
  });
}

const getImage = (request, response) => {
    const options = {
    url: 'https://static.pexels.com/photos/8700/wall-animal-dog-pet.jpg',
    dest: './images'                  
  }
  
  download.image(options)
    .then(({ filename, image }) => filename)
    .then((filename) => {
      console.log(filename);
      fs.readFile(`${filename}`, (err, data) => {
        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
        response.end(data);
      });
    })  
  .catch((err) => {
    throw err;
  })
}

const processForm = (request, response) => {
  const form = new formidable.IncomingForm();
  form.parse(request, (err, fields) => {   
    response.end(`My name is ${fields.firstname} ${fields.lastname}`);
  });
}

const defaultPage = (requst, response) => {
  response.end('Page not found');
}


const requestHandler = (request, response) => {
  logger.info(request.url);
  if (request.method === 'GET') {
    switch (request.url) {
      case '/':
        getHandler(request, response);
        break; 
      case '/info':
        getUser(request, response);
        break;
      case '/index.html':
        showFormPage(request, response);
        break;
      case '/internet-file':
        getImage(request, response);
        break;
      default:
        defaultPage(request, response);     
    }
  }

  if (request.method === 'POST') {
    switch (request.url) {
      case '/http-server.js':
        processForm(request, response);
        break;
    }
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something wrong');
  }

  console.log(`server is listening on port ${port}`);
});
