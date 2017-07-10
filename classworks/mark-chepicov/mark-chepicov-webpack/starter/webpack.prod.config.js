const webpack = require('webpack');
const path = require('path');
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
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: 
            ["css-loader",
            "sass-loader"],
            publicPath: "/build"
        })
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

  plugins: [new ExtractTextPlugin({
        filename: "bundle.css",
        disable: false,
        allChunks: true
    })
  ]
}