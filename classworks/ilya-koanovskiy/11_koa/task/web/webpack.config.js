const webpack = require('webpack');

module.exports = {
  entry: `${__dirname}/src/client/index.js`,

  output: {
    path: __dirname,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};
