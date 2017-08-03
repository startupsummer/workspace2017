const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: `${__dirname}/src/client/index.js`,

  output: {
    path: `${__dirname}/build/`,
    publicPath: '/build/',
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },

    ],
  },
};
