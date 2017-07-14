const webpack = require('webpack');

module.exports = {
  entry: './example.js',

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: { presets: ['react'] },
    }],
  },
};
