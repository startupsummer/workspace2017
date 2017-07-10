const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: __dirname + "/index.js",

  output: {
    path: __dirname + '/build/',
    publicPath: '/build',
    filename: 'bundle.js',
  },
  module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['env']
                }
            }
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
        },
         {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader",
                    "sass-loader"
                ]
            })
        }    
        ]
    },
        devServer: {
            publicPath: '/',
            contentBase: path.join(__dirname, "/"),
        },
        devtool: "source-map",  
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin("style.css") 
    ] 
};