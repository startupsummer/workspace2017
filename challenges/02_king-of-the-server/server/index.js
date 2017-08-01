'use strict';
const http = require('http');
const game = require('./game');

function getBody(req, cb) {
    let fullBody = '';
    req.on('data', chunk => {
        fullBody += chunk.toString();
    });
    req.on('end', () => {
        try {
            const body = JSON.parse(fullBody);
            return cb(null, body);
        } catch (e) {
            return cb(e);
        }
    });
}

function isValid(reqBody) {
    return reqBody &&
        reqBody.length === 2 &&
        typeof reqBody[0] === 'string' &&
        typeof reqBody[1] === 'string' &&
        reqBody[0] === game.get() &&
        reqBody[0] !== reqBody[1];
}

http.createServer((req, res) => {
        if (req.method === 'GET') {
            return res.end(game.get());
        }
        if (req.method === 'POST') {
            return getBody(req, (err, body) => {
                if (err) {
                    res.statusCode = 400;
                    return res.end('Something went wrong');
                }
                if (!isValid(body)) {
                    res.statusCode = 400;
                    return res.end('It looks like you\'re sending wrong data, check your request.');
                }
                game.set(body[1]);
                res.statusCode = 200;
                return res.end();
            });
        }
    })
    .listen(3000, () => console.log('Server start'));
