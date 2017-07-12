const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/assets/scripts/__index.js'),

    output: {
        path: path.join(__dirname, '/public'),
        publicPath: './',
        filename: 'bundle.js',
    },

    module: {
        rules: [{
            test: /\.sass$/,
            use: ExtractTextWebpackPlugin.extract({
                use: [
                  'css-loader',
                  'sass-loader'
                ],
                fallback: 'style-loader'
            })
        },{
            test: /\.(jpe?g|png|gif)$/i ,
            use: ['file-loader'],
            exclude: /node_modules/
        },{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        },{
            test: /\.html$/,
            use: ['html-loader']
        }]
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: './assets/index.html'
        }),
        new ExtractTextWebpackPlugin('bundle.css')
    ]
};
