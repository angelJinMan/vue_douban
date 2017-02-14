/*
* 发布时候的配置文件
* */

// 特别注意
// extract-text-webpack-plugin和webpack-dev-server都要升级到2.x版本

var path = require('path')
var webpack=require('webpack')
// 抽取css的第三方插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 自动生成index.html页面插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 删除文件夹
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, 'src/js/app.js'),
        vendors: ['vue','vue-router']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            // 处理.vue文件的加载器
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader',
                        css: ExtractTextPlugin.extract({
                            loader: 'css-loader',
                            fallbackLoader: ['style-loader','vue-style-loader'] // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            },
            // 处理js和jsx语法到es5
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            // 处理在js中引用css文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader"
                })
            },
            // 处理图片操作  25000bit ~3kb
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=25000&name=images/[name].[ext]'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader?limit=100000&name=fonts/[name].[ext]'
            }
        ]
    },
    // vue: {
    //     loaders: {
    //         js: 'babel',
    //         css:'style!css'
    //     }
    // },
    // resolve: {
        // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        // 注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
        // extensions: ['', '.js', '.json', '.scss', '.jsx','.vue'],
        // 模块别名定义，方便后续直接引用别名，无须多写长长的地址。后续直接 require('AppStore') 即可
        // alias: {
        //     react1:'node_modules/react/react.js',
        //    AppStore: 'js/stores/AppStores.js',
        //    ActionType: 'js/actions/ActionType.js',
        //    AppAction: 'js/actions/AppAction.js'
        // }
    // },
    // 在这个属性里面定义的包是不会被打包进bundle。js文件中的,如果你要用这个属性，别忘了在index。html中引入cdn
    // externals: {
    //     // 配置了这个属性之后react和react-dom这些第三方的包都不会被构建进js中，那么我们就需要通过cdn进行文件的引用了
    //     // 前边这个名称是在项目中引用用的，相当于import React from  ‘react1’中的react，
    //     //'react1':"react",
    //     'react1':"react",
    //     'react-dom1':"react-dom",
    //     '$1':"jQuery"
    //
    // },
    plugins: [
        // 删除文件夹的插件
        new CleanPlugin(['dist']),
        // 分离第三方应用的插件
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        // 压缩混淆js代码插件
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
        new ExtractTextPlugin("app.css"),
        // 自动生成html插件
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css":["app.css"],
                    "js": ["vendors.js", "bundle.js"]
                }
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        // 在构建的过程中删除警告
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        })
    ]


}