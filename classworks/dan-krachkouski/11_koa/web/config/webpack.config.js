const path = require('path')

module.exports = {
  entry: path.join(__dirname, '../src/client/scripts/__index.js'),

  output: {
    path: path.join(__dirname, '../lib'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.sass$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      use: [
        'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]'
      ],
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  },

  devtool: 'source-map'
}
