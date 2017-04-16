/**
* 2017.04.16 by mengqingshen
*/
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const fs = require('fs')

fs.open('./src/config/env.js', 'w', (err, fd) => {
  const buf = 'export default "production"'
  fs.write(fd, buf, 0, buf.length, 0,(err, written, buffer) => {})
})

module.exports = merge(webpackBaseConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['super', '$', 'exports', 'require']
      }
    })
  ]
})