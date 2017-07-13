module.exports = {
  entry: `${__dirname}/index.js`,
  output: {
    path: `${__dirname}/build/`,
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
    }],
  },
};
