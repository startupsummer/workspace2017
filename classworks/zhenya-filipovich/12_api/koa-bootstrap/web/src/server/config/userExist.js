module.exports = (email, db) => db.find(user => email === user.email);
