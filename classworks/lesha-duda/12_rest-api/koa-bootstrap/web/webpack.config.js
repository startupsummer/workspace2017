const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `./src/client/index.js`,

  output: {
    path: `${__dirname}/build/`,
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
          ],
        }),
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        },
      },

      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    // new HtmlWebpackPlugin({ template: './src/client/index.html', filename: 'index.html' }),
  ],
};
