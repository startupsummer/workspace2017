const path = require('path');
const webpack = require('webpack');

module.exports = {

 entry: `${__dirname}/index.js`,

  output: {
    path: `${__dirname}/build/`,
    publicPath: '/',
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
        loaders: [
          'babel-loader',
        ],
      },
  ]
},

  devServer: {
    hot: true,
    publicPath: '/',
    contentBase: path.join(__dirname, "/"),
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],





}
