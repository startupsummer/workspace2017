const http = require('http');
const fs = require('fs');
const stream = fs.createReadStream('./public/index.html');
const formBody = require("body/form");
const request = require('request');

const winston = require('winston');
winston.configure({
   transports: [
     new (winston.transports.File)({ filename: 'somefile.log' })
   ]
 });

const port = 3000;

const username = 'Sergei  Oliferchik';
let data  = '';

const postHandler = (request, response) => {
  function send(err, body) {
    let { firstName, lastName } = body;
    response.end(`My name is ${firstName} ${lastName}`);
  }

  formBody(request, {}, send);
// let body = '';
//
// request.on('data', data => {
//   body += data;
// });
//
// request.on('end', () => {
//   let [firstname, lastName] = JSON.parse(body);
//   response.end(`my name ${firstname} LastName ${lastName}`);
// });
}

//

const getHandler = (req, res) => {
  const urlImg = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Red_Hot_Chili_Peppers_2012-07-02_001.jpg';

  switch (req.url) {
    case '/': res.end('Hello Node.js Server!');
      break;
    case '/info': res.end(`Hello. My name is ${username}`);
      break;
    case '/index.html': res.end(data);
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

stream.on('data', (streamData) => {
  data += streamData.toString('utf8')
})

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
