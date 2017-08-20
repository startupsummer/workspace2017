const Koa = require('koa')
const app = new Koa(); 

koa.use(async (ctx) => {
    ctx.body = 'Hello world';
})

koa.listen(3000, () => 'koa is listening on port 3000');
