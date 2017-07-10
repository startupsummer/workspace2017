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
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: [
            'babel-loader',
          ]
      }
    ],
  }
}
