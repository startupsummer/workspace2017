const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },

      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
      },
    ],
  },


  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],

};
