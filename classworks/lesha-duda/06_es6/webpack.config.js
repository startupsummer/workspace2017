module.exports = {
  entry: `${__dirname}/index.js`,
  // entry: [
  //   "babel-polyfill",
  //   "${__dirname}/index.js",
  // ],

  output: {
    path: `${__dirname}/build/`,
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["es2015"]
            }
          }
      },
    ],
  },
}
