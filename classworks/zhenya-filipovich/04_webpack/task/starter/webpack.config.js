const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');  
module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'es2015' ]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('style.css')
    ]
    

}