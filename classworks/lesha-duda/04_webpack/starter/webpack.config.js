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

      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //      use: "css-loader"
      //   })
      // },

      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: [
            'babel-loader',
          ]
      },

      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
        ],
        exclude: /node_modules/,
      },

      // plugins: [
      //   new ExtractTextPlugin("styles.css"),
      // ],
    ],
  }
}
