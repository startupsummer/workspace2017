const http = require('http');
const fs = require('fs');
const winston = require('winston');
const body = require('body/form');


winston.level = 'debug';

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'server.log' }),
  ],
});

const parseBody = (req, opt) =>
  new Promise((resolve, reject) => {
    body(req, opt, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });


const router = {
  '/': {
    GET: (req, res) => {
      res.write('Hello Startup Summer');
      res.end();
    },
  },
  '/info': {
    GET: (req, res) => {
      res.write('Hello. My name is Dan Kr');
      res.end();
    },
  },
  '/index.html': {
    GET: (req, res) => {
      const file = fs.createReadStream('./public/index.html');
      file.pipe(res);
    },
    POST: (req, res) => {
      parseBody(req)
      .then((data) => {
        res.write(`FirstName: ${data.first_name}, LastName: ${data.last_name}`);
        res.end();
      }).catch((reason) => {
        res.write(reason.toString());
        res.end();
      });
    },
  },
  '/internet-file': {
    GET: (req, res) => {
      http.get('http://media.giphy.com/media/Vg0JstydL8HCg/giphy.gif', (getRes) => {
        getRes.pipe(res);
      });
    },
  },
};

http.createServer((req, res) => {
  if (router[req.url] && router[req.url][req.method]) {
    router[req.url][req.method](req, res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }

  winston.log('info', 'Request', {
    url: req.url,
    code: res.statusCode,
  });
}).listen(3000);
