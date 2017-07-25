const baseValidator = require('./../../../baseValidator.js');

module.exports = ctx => baseValidator(ctx, async () => {
  const name = ctx.query.name; // TODO add koa-validate module

  if (!name) {
    ctx.errors.push({ name: 'Name is empty!' });
  }

  return {
    name,
  };
});
