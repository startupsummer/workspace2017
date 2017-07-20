const http = require('http');
const fs = require('fs');
const formBody = require("body/form");
const request = require('request');

const port = 3000;

const winston = require('winston');
winston.configure({
   transports: [
     new (winston.transports.File)({ filename: 'somefile.log' })
   ]
 });

const postHandler = (req, res) => {
  switch (req.url) {
    case '/form': formBody(req, {}, (err,body) => {
        let { firstName, lastName } = body;
        res.end (`My name is ${firstName} ${lastName}`);
      });
      break;

    default:
  }
}

const getHandler = (req, res) => {
  const urlImg = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Red_Hot_Chili_Peppers_2012-07-02_001.jpg';
  const username = 'Sergei  Oliferchik';
  const stream = fs.createReadStream('./public/index.html');

  switch (req.url) {
    case '/': res.end('Hello Node.js Server!');
      break;
    case '/info': res.end(`Hello. My name is ${username}`);
      break;
    case '/index.html': stream.on('data',
    (streamData) => {
      res.end(streamData.toString('utf8'));
    });
      break;
    case '/internet-file': request(urlImg).pipe(res);
    default:
  }
}

const requestHandler = (request, response) => {
  winston.log('info', 'Test Log Message', { anything: 'This is metadata' });

  switch (request.method) {
    case 'GET':
      getHandler(request, response)
      break

    case 'POST':
      postHandler(request, response)
      break
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
