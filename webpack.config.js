var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    'popup/js/main': './src/entrys/popup.js',
    'contentScriptController/js/main': './src/entrys/contentScriptController.js',
    'iframePageForImg/js/main': './src/entrys/iframePageForImg.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.s[a|c]ss$/,
        loader: ExtractTextPlugin.extract('style', 'css', 'sass?sourceMap')
      },
      {
        test: /\.pug$/,
        loaders: ['pug-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.pug',
      hash: true
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks: ['common', 'popup/js/main'],
      template: 'src/html/popup.pug',
      hash: true
    }),
    new HtmlWebpackPlugin({
      filename: 'iframePageForImg.html',
      cache: true,
      chunks: ['common', 'iframePageForImg/js/main'],
      template: 'src/html/iframePageForImg.pug',
      hash: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        cache: true,
        name: "common",
        filename: "common/js/common.js"
    }),
    new webpack.BannerPlugin("这里是打包文件头部注释！")
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'manifest.json'
      }
    ])
    ,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['super', '$', 'exports', 'require']
      }
    })
  ])
}
