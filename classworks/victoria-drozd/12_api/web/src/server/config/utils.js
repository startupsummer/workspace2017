const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const TOKEN_EXP = 30;
const TOKEN_SECRET = 'xsecretkey';
const db = {};

exports.db = db;

exports.TOKEN_EXP = TOKEN_EXP;

exports.generateHash = password => bcrypt.hash(password, saltRounds);

exports.compare = bcrypt.compare;

exports.generateToken = data => jwt.sign(
  { data }, TOKEN_SECRET, { expiresIn: `${TOKEN_EXP}s` }
);

exports.verifyToken = async (token) => {
  if (!token) {
    return false;
  }

  try {
    const { data } = await jwt.verify(token, TOKEN_SECRET);
    if (!db[data]) {
      return false;
    }

    return true;

  } catch (err) {
    console.error(err);
    return false;
  }
};