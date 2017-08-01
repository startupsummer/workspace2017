const request = require('request');

const url = 'http://192.168.2.97:3000';

function getCurrentLeader(cb) {
    return request(url, (error, response, body) => {
        if (error) {
            return cb(error);
        }
        if (response.statusCode !== 200) {
            return cb(new Error(body));
        }
        return cb(null, body);
    });
}

function setLeader(currentLeaderName, newLeaderName, cb) {
    return request.post({
        url: url,
        json: true,
        body: [currentLeaderName, newLeaderName]
    }, (error, response, body) => {
        return cb(error, body);
    });
}
