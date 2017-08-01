## Lecture task

- Add static files from previous lectures (webpack) to web/client folder
- Add additional middlewares to koa web server (koa-webpack-dev-middleware)
- Save last user's visit to session and display it on the page
- Add form 'How I spent the summer' to page (should include first name input, last name input, textarea, select to set summer quality)
- Create additional fetch API to send form to koa api server (use [api.client.js](./api.client.js))
- Create koa route that accept POST request (`/post-form`).
- Add body validator to validate request data (`koa-validate`). First name should be required and 3-20 characters, same for last name.
- Output validated data to console (`console.dir`) and respond with following json: `{ok: true}`

## Resources

- [koa-webpack-dev-middleware](https://github.com/yiminghe/koa-webpack-dev-middleware/tree/2.x)
- [koa-session](https://github.com/koajs/generic-session)
- [koa-validate](https://www.npmjs.com/package/koa-validate)
- [fetch API](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)
- [fetch MDN](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)
