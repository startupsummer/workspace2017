const webpack = require('webpack');
const config = require('./../../server/config');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/client/src/',
  ],

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: '[name].js',
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: { presets: ['react', 'es2015', 'stage-0'] },
    }, {
      test: /\.pcss|\.styl$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader?sourceMap', 'stylus-loader?sourceMap'],
    }],
  },

  devtool: 'source-map',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.jsx', '.pcss'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.config': JSON.stringify(config),
    }),
  ],
};
