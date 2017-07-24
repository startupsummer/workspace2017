const path = require('path');

console.log(__dirname);

module.exports = {
  entry: path.join(__dirname, './src/client/src/index.js'),
  output: {
    path: path.join(__dirname, './src/client/dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
      },
    ],
  },
};
