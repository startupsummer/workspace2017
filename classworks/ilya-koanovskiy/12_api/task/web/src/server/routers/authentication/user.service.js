const service = require('api/src/db').createService('user');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

service.isTokenValid = async (decoded) => {
  try {
    const userEmail = decoded.email;
    console.log(`${userEmail} user email`);

    const findUser = await service.findOne({ email: userEmail });
    console.log(findUser);
    if (findUser == null) return false;
    if (findUser.password === decoded.password) return true;
    return false;
  } catch (err) {
    return false;
  }
};

service.sendToken = (user) => {
  console.log(user);
  return service.update(
    { _id: user._id },
    { $set: { token: jwt.sign({
      email: user.email,
      password: user.password,
      exp: Math.floor(Date.now() / 1000) + (100),
    }, 'shhhhh') } });
};

service.findUser = data => service.findOne(data);

service.createUser = (data) => {
  const user = {
    email: data.name,
    password: passwordHash.generate(data.surname),
    thoughts: data.thoughts,
    quality: data.quality,
  };

  return service.create(user);
};

module.exports = service;
