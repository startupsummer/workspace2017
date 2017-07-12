## Before starting the task

Copy starter project into you own workspace folder.

## Lecture task

1. Implement `npm start` task to start your project using webpack-dev-server.
2. Create a simple webpage with two blocks. First block is an image (`i-love-js.jpg`) in the center of the page (100px margin from top) with message why you love javascript underneath. Second block is copyrights with your name in the bottom of the page (footer). For example: `Andrew Orsich, 2017 © All rights reserved`
3. Configure `babel-loader` to load Javascript, `sass-loader` to load scss, `url-loader` to load images.
4. To show render current year use `moment` & `jQuery` (wrap year into span and use class as selector to update it using jQuery).

Advanced:

1. Implement `npm run build` task and `webpack.config.js` to build your application for production. Use `ExtractTextPlugin` to extract css into separate file. Use `UglifyJsPlugin` to minimize Javascript.

Notes:

1. Your webpack entry point need to be a Javascript file `index.js`, require `scss` and `js` files there.
2. You might want to look into `webpack.example.config.js` to learn how to implement dev server and serve static content and html.

What should be in each file:

1. Styles: `footer.scss` - styles for footer, `iLoveJs.scss` - styles for the images and reason why you love JS, `index.scss` - optional styles for the page.
2. Javascript: `getYear.js` - should export a function which returns current year using `moment`, `getWhyILove.js` - should export function which return three phrases with reasons why you love javascript based on remainder of the division on 4 of the current time. If remainder is 1 - return first phrase, if 2 - return second phrase, otherwise - return third phrase. `index.js` - should render current year into footer and javascript praise phrase underneath image.
3. Images: `i-love-js.jpg` - use this image on your page.
4. `webpack.config.js` - this is development environment webpack.
5. `wepack.prod.config.js` - this is production environment webpack for advanced task.
6. `package.json` - should contains all npm dependencies to implement a task. Use `npm i package` to install required dependencies.
7. `webpack.example.config.js` - an example of webpack config from the past tasks.

## Finishing a task

Once you've completed the task submit a Pull Request with:

1. Implemented project
2. Attach screenshot of resulting page to the pull request (just drag & drop image into the comments area)
3. Assign reviewer and add `To Review` label.
4. Use `ES6` arrow functions to implement `iLoveJs.js` and `getYear.js`. This way you'll make sure that `babel-loader` was configured properly.

## Resources

- [webpack documentation](https://webpack.js.org)
