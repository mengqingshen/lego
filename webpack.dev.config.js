const webpack = require('webpack')
const merge = require('webpack-merge')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config.js')
const fs = require('fs')

fs.open('./src/config/env.js', 'w', (err, fd) => {
  const buf = 'export default "development"'
  fs.write(fd, buf, 0, buf.length, 0, (err, written, buffer) => {})
})

module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 10040,
        proxy: 'http://localhost:8080/'
      },
      {
        reload: false
      }
    )
  ]
})
