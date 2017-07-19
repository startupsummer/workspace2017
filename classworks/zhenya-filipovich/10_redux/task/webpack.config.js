const webpack = require('webpack');

module.exports = {
  entry: './index.jsx',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: { presets: ['react', 'es2015', 'stage-0'] },
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }],
  },

  devServer: {
    hot: true,
  },

  devtool: 'source-map',

  // use resolve to use syntax like "import 'something' from './index'"
  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.jsx', '.css'],
  },
};
