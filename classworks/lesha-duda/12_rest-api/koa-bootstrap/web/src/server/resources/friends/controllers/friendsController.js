const jwt = require('jsonwebtoken');
const verifyToken = require('web/src/server/resources/friends/controllers/verifiers/verifyToken');


async function friendsController(ctx) {
  try {
    if(ctx !== undefined && ctx.query !== undefined) {
      const queryObj = ctx.query;
      let decodedToken = jwt.verify(queryObj.token, 'privateSecret');
      let isVerifiedToken = verifyToken(decodedToken);

      if(isVerifiedToken) {
        ctx.body = "This is very private page, be carefull";
      } else {
        ctx.body = "Invalid token";
        ctx.status = 401;
      }
    }
    else {
      ctx.body = "OOPs, private page";
      ctx.status = 401;
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports = friendsController;
