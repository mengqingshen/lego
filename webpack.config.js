var path = require('path')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var extractCommomForContentCSS = new ExtractTextPlugin("content-css/common.css");

module.exports = {
    cache: true,
    context: path.resolve(__dirname, './src'),
    entry: {
        'background/index': './background/entry.js',
        'popup/index': './popup/entry.js',
        'content-script/index': './content-script/entry.js',
        'iframes/downloader/index': './iframes/downloader/entry.js',
        'iframes/qrcode/index': './iframes/qrcode/entry.js',
        vendor: ['vue', 'vuex', 'jquery']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: "/chunks/[name].js"
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
                test: require.resolve('jquery'),
                loader: "expose-loader?$!expose-loader?jQuery"
            },
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
            // 针对页面中窗口的通用样式需要提取出单独的文件，从而通过 insertCSS 注入到页面
            {
                test: /seanway\.scss$/,
                use: extractCommomForContentCSS.extract([
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]),
                include: /content-css/,
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
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
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
    devServer: {
        historyApiFallback: true,
        noInfo: true
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
            }
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
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
        new HtmlWebpackPlugin({
            filename: 'iframes/downloader/index.html',
            cache: true,
            chunks: ['vendor', 'iframes/downloader/index'],
            template: 'iframes/downloader/index.pug',
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'iframes/qrcode/index.html',
            cache: true,
            chunks: ['vendor', 'iframes/qrcode/index'],
            template: 'iframes/qrcode/index.pug',
            hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
                cache: true,
                names: ['vendor'],
                filename: "common/common.js"
        }),
        new webpack.BannerPlugin("这里是打包文件头部注释！"),
        extractCommomForContentCSS
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = 'cheap-module-source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     mangle: {
        //         except: ['super', '$', 'exports', 'require']
        //     }
        // })
    ])
}
else {
    module.exports.plugins = (module.exports.plugins || []).concat([
        // new BrowserSyncPlugin(
        //     {
        //         host: 'localhost',
        //         port: 10040,
        //         proxy: 'http://localhost:8080/'
        //     },
        //     {
        //         reload: false
        //     }
        // )
    ])
}
