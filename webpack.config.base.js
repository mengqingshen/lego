const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const findEntries = require('./util/find-entries')

const extractCommomForContentCSS = new ExtractTextPlugin('content-css/common.css')
const extractForIframes = new ExtractTextPlugin('[name].css')

const pageEntries = {}
const pageHtmls = []

findEntries(path.join(__dirname, 'src/pages')).forEach((path) => {
  const match = path.match(/src\/pages\/(.*)\/entry\.js/)
  const varPath = match[1]
  pageEntries[`pages/${varPath}/index`] = `./pages/${varPath}/entry.js`

  const configPath = path.replace('entry.js', 'config.js')
  const title = fs.existsSync(configPath) ? require(configPath).title : 'jarvis'

  pageHtmls.push(new HtmlWebpackPlugin({
    filename: `pages/${varPath}/index.html`,
    cache: true,
    chunks: ['vendor', `pages/${varPath}/index`],
    template: `common/templates/page.pug`,
    title,
    hash: true
  }))
})

module.exports = {
  cache: true,
  context: path.resolve(__dirname, './src'),
  entry: {
    'vendor': ['vue', 'vuex', 'jquery'],
    'background/index': './background/entry.js',
    'popup/index': './popup/entry.js',
    'content-script/index': './content-script/entry.js',
    ...pageEntries
  },
  output: {
    path: path.resolve(__dirname, './jarvis'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),  // New
    historyApiFallback: true,
    noInfo: true
  },
  module: {
    rules: [
      {
        test: /iview.src.*?js$/,
        loader: 'babel'
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|assets|lib)/
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery'
      },

      // 提取在 iframe 显示的页面的 css 到单独的文件。期望能利用浏览器的缓存，并降低 js 消耗的资源（并没对比分析）。
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: extractForIframes.extract({
              use: [
                'css-loader',
                'sass-loader'
              ],
              fallback: 'vue-style-loader'
            })
          }
        },
        include: [/pages/, /node_modules\/vue-material/, require.resolve('vue-material').replace('/dist/vue-material.js', '')]
      },

      // options 中的配置不能省略（因为默认情况下 .vue 文件中只能 lang="sass"，lang="scss" 会报错）
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        },
        exclude: /pages/
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

      // 针对页面中窗口的通用样式需要提取出单独的文件，从而通过 insertCSS 注入到页面
      {
        test: /jarvis\.scss$/,
        use: extractCommomForContentCSS.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]),
        include: /content-css/
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /content-css/
      },

      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]?[hash]'
            }
          }
        ],
        exclude: /content-script\/assets/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'manifest.json'
      },
      {
        from: 'assets/way.png',
        to: 'assets/way.png'
      },
      {
        from: 'assets/svg',
        to: 'assets/svg'
      }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'background/index.html',
      template: 'background/index.pug',
      chunks: ['vendor', 'background/index'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      filename: 'popup/index.html',
      chunks: ['vendor', 'popup/index'],
      template: 'popup/index.pug',
      hash: true
    }),
    ...pageHtmls,
    new webpack.optimize.CommonsChunkPlugin({
      cache: true,
      names: ['vendor'],
      filename: 'common/common.js'
    }),
    new webpack.BannerPlugin('http://notehub.mengqingshen.com！'),
    extractCommomForContentCSS,
    extractForIframes
  ],
  resolve: {
    // 指定可以被 import 的文件后缀
    extensions: ['.js', '.vue', '.json', '.sass', 'scss', '.pug', '.css'],
    alias: {
      'vue': 'vue/dist/vue.js',
      '@api': path.join(__dirname, 'src/api'),
      'core': 'vue-material/src/core'
    }
  }
}
