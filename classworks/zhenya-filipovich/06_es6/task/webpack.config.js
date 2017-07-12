const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('/dist'),
    publicPath: '/dist',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        },
      },
    ],
  },
};
