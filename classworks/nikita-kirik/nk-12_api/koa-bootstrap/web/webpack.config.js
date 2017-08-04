const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: `${__dirname}/src/client/index.js`,

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
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  // devServer: {
  //   hot: true,
  //   publicPath: '/',
  //   contentBase: path.join(__dirname, '/'),
  // },

  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  // ],
};
