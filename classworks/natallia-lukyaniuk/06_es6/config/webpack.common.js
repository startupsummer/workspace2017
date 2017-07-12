const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
    }),
    new ExtractTextPlugin('[name].bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use:
        [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: path.join(__dirname, '..', 'node_modules'),
        loaders: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(svg|png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};