const webpack = require('webpack');
const apiMocker = require('webpack-api-mocker');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const sassLoader = require('../config/sassLoader');
const cssLoader = require('../config/cssLoader');
const img_fontLoader = require('../config/img_fontLoader');

// const NpmInstallPlugin = require('npm-install-webpack-plugin'); //目前需要webpack3以下版本支持

module.exports = (PATHS) => merge([
    {
        output: {
            publicPath: '/'
            // publicPath: 'http://localhost:8080'
        }
    },
    sassLoader.loadSass({
        use: [cssLoader.autoprefix(), cssLoader.px2rem(), sassLoader.fastSass()]
    }),
    cssLoader.loadCss({
        use: [cssLoader.autoprefix(), cssLoader.px2rem()]
    }),
    img_fontLoader.loadImages(),
    {
        devServer: {
            stats: "errors-only",
            host: process.env.HOST, // Defaults to `localhost`
            port: process.env.PORT, // Defaults to 8080
            hot: true,
            inline: true,
            open: true,
            openPage: PATHS.openPage,
            overlay: true,
            before(app) {
                apiMocker(app, path.join(process.cwd(), 'config/proxy.js'))
            },
            proxy: {
                '/filterData': {
                    target: 'http://luna.58.com/api/filter?plat=m&city=bj&cate=banjia&-15=20&tag=newpage_top_icon_jiazheng_banjia&PGTID=0d202140-0000-16bf-fb66-40d18502061f&ClickID=2&pagetype=list',
                    changeOrigin: true,
                    secure: false
                }
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new ErrorOverlayPlugin()
        ]
    }
]);