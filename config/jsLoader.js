//js解释器
exports.loadJs = ({
    include,
    use = []
} = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: use.concat(["babel-loader"])
            }
        ]
    }
});


//抽离公共文件
const path = require('path');
exports.commonChunk = () => ({
    entry: {
        vendor: ['vue']
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {//node_modules内的依赖库
    //                 chunks: "all",
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendors",
    //                 minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
    //                 maxInitialRequests: 5,
    //                 minSize: 0
    //                 // priority: 100
    //                 // enforce: true?
    //             },
    //             common: {// ‘src/js’ 下的js文件
    //                 chunks: "all",
    //                 test: /[\\/]src[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
    //                 name: "commons", //生成文件名，依据output规则
    //                 minChunks: 2,
    //                 maxInitialRequests: 5,
    //                 minSize: 0
    //                 // priority: 1
    //             }
    //         }
    //     }
    // }
});

//前置依赖包
const DllReferencePlugin = require('webpack').DllReferencePlugin;
exports.dllJs = () => ({
    plugins: [
        new DllReferencePlugin({
            /**
             * 在这里引入 manifest 文件
             */
            manifest: path.join(process.cwd(), 'lib', 'vendors.mainfest.json')
        }),

    ]
});

//压缩js
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
exports.minifyJavaScript = () => ({
    optimization: {
        minimizer: [new UglifyWebpackPlugin({ sourceMap: true })]
    }
});

//eslint开发规范
exports.eslint = ({
    include
} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include,
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }
        ]
    }
});

//清除不用的js模块
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
exports.shakeJS = () => ({
    plugins: [new WebpackDeepScopeAnalysisPlugin()]
});