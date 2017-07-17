const http = require('http');
const fs = require('fs');
const winston = require('winston');
const anyBody = require('body/any');
const multipart = require('parse-multipart');


winston.level = 'debug';

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'server.log' }),
  ],
});

const parseBody = (req, res, opt) =>
  new Promise((resolve, reject) => {
    anyBody(req, opt, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });

const collect = stream =>
  new Promise((resolve, reject) => {
    let data = '';
    stream.on('data', (chunk) => {
      data += chunk;
    });
    stream.on('end', () => {
      resolve(data);
    });
    stream.on('error', (error) => {
      reject(error);
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
      parseBody(req, res)
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
  '/upload': {
    POST: (req, res) => {
      const header = req.rawHeaders.find(item => item.startsWith('multipart/form-data'));
      const boundary = multipart.getBoundary(header);
      collect(req)
      .then((data) => {
        const parts = multipart.Parse(
          new Buffer(data, 'utf-8'), boundary,
        );
        parts.forEach((part) => {
          const ext = part.filename.split('.').pop();
          const file = fs.createWriteStream(`files/upload.${ext}`);
          file.write(part.data.slice(3).toString('utf-8'));
          file.end();
          res.end('Upload sucessfull');
        });
      })
      .catch((reason) => {
        res.writeHead(500);
        res.end(`Not completed: ${reason.toString()}`);
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
