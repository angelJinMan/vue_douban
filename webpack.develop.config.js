/*
 * 开发时候的配置文件
 * */

// 1、webpack2已经不支持自定义属性在配置文件中
// 2、在加载器中如果用了options属性那么必须配合loader属性使用，不能用use
// 3、-loader一定要写全

var path = require('path')
var webpack = require('webpack')
// 自动打开浏览器插件
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
    devtool: 'eval',
    entry: path.resolve(__dirname, 'src/js/app.js'),
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
                        js: [
                                'babel-loader',
                                {
                                    loader: "eslint-loader",
                                    options: {
                                        configFile: '.eslintrc.js'
                                    }
                                }
                        ],
                        css: 'style-loader!css-loader'
                    }
                }
            },
            // 处理js和jsx语法到es5
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        // options:{
                        //     presets: ['es2015', 'react']
                        // }
                    }
                ]
            },
            // 处理在js中引用css文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // 处理图片操作  25000bit ~3kb
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    // 需要自己单独配置服务器
    devServer: {
        contentBase: __dirname + '/src',
        hot: true,
        inline: true, // 默认是true
        port: 8080,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        // stats: 'minimal',
        // publicPath: publicPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url: 'http://localhost:8080/', browser: 'chrome'})
    ]

}

