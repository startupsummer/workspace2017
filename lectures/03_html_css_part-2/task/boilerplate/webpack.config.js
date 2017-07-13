const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
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
    contentBase: `${__dirname}/`,
    publicPath: '/',
    contentBase: path.join(__dirname, "prototype/assets"),
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './prototype/index.html', filename: 'index.html' }),
  ],
};
