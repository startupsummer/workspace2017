const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.generateHash = password => bcrypt.hash(password, saltRounds);

exports.compare = bcrypt.compare;

exports.generateToken = data => jwt.sign({data}, 'xsecretkey', { expiresIn: '30s'});