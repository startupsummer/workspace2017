const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: `${__dirname}/prototype/assets/styles/index.pcss`,

  output: {
    path: `${__dirname}/build/`,
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.pcss$/,
<<<<<<< HEAD
<<<<<<< HEAD
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
=======
=======
>>>>>>> master
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
          ],
        }),
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  devServer: {
    hot: true,
<<<<<<< HEAD
<<<<<<< HEAD
    publicPath: '/',
    contentBase: path.join(__dirname, "prototype/assets"),
=======
    contentBase: `${__dirname}/`,
    publicPath: '/',
>>>>>>> master
=======
    contentBase: `${__dirname}/`,
    publicPath: '/',
>>>>>>> master
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './prototype/index.html', filename: 'index.html' }),
<<<<<<< HEAD
<<<<<<< HEAD
=======
    new ExtractTextPlugin('style.css'),
>>>>>>> master
=======
    new ExtractTextPlugin('style.css'),
>>>>>>> master
  ],
};
