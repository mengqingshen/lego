var path = require('path')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin("windowForCrawl.css");

module.exports = {
    cache: true,
    context: path.resolve(__dirname, './src'),
    entry: {
        'background/index': './background/entry.js',
        'popup/index': './popup/entry.js',
        'content-script/index': './content-script/entry.js',
        'iframes/crawl-img/index': './iframes/crawl-img/entry.js',
        vendor: ['vue', 'vuex', 'jquery']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
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
            {
                test: /\.s[a|c]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ],
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
    devtool: 'source-map',
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
        new ExtractTextPlugin({
            filename: "content-css/crawl.css",
            disable: false,
            allChunks: true
        }),
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
            filename: 'iframes/crawl-img/index.html',
            cache: true,
            chunks: ['vendor', 'iframes/crawl-img/index'],
            template: 'iframes/crawl-img/index.pug',
            hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
                cache: true,
                names: ['vendor'],
                filename: "common/common.js"
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
