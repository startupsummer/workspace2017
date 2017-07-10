const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }

            },
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
                test: /.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        'sass-loader'
                    ], 
                    publicPath: "/"
                })
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new HtmlWebpackPlugin({ template: './index.html' })
    ],
};