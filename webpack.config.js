var path = require('path')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin("windowForCrawl.css");

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    'bg/js/main': './entrys/bg.js',
    'popup/js/main': './entrys/popup.js',
    'contentScriptController/js/main': './entrys/contentScriptController.js',
    'windowForCrawl/js/main': './entrys/windowForCrawl.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),  // New
  },
  // 指定可以被 import 的文件后缀
  resolve: {
    extensions: ['.js', '.vue', '.json', '.sass', 'scss', '.pug', '.css']
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   }
    // ],
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'stage-0'],
                cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[a|c]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader'],
          publicPath: "/dist"
        })
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]?[hash]'
            }
          }
        ]
        
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: "stylesheets/insertCSSForCrawl.css",
      disable: false,
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: "webpack-zepto",
      Zepto: "webpack-zepto",
      "window.Zepto": "webpack-zepto"
    }),
    new HtmlWebpackPlugin({
      filename: 'bg.html',
      template: 'html/bg.pug',
      chunks: ['common', 'bg/js/main'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks: ['common', 'popup/js/main'],
      template: 'html/popup.pug',
      hash: true
    }),
    new HtmlWebpackPlugin({
      filename: 'windowForCrawl.html',
      cache: true,
      chunks: ['common', 'windowForCrawl/js/main'],
      template: 'html/windowForCrawl.pug',
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
