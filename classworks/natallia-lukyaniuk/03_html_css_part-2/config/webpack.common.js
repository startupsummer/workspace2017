const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/assets/index.js',
  // entry: `${__dirname}/prototype/index.js`,

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
  },
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: path.join(__dirname, '..', 'node_modules'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
            },
          },
          'eslint-loader',
        ],
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
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
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
};
