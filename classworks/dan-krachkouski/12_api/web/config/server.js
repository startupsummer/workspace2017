const path = require('path')

module.exports = {
  port: 5483,
  host: 'localhost',
  publicPath: path.resolve(__dirname, '../src/client/'),
  redis: {
    host: 'localhost',
    port: '4651'
  }
}
