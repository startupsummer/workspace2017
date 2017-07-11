const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
            presets: ['env']
            }
        }
    },
      {
        test: /\.scss$/,
        loaders: [
            'style-loader',
            'css-loader',
            'sass-loader',
        ],
    },
    {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },

  devServer: {
    hot: true,
    publicPath: '/',
    contentBase: path.join(__dirname, "/"),
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './index.html', filename: 'index.html' }),
  ]
}