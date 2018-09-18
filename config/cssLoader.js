// 正常解析sass
exports.loadCss = ({
    include,
    exclude,
    use = []
} = {}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: ["style-loader", "css-loader"].concat(use)
                }
            ]
        }
    };
};

//抽离sass
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.extractCss = ({
    include,
    exclude,
    use = []
} = {}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader'
                    ].concat(use)
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].css"
            })
        ]
    };
};

//清除多余的
const PurifyCSSPlugin = require("purifycss-webpack");
exports.purifyCss = ({ paths }) => ({
    plugins: [
        new PurifyCSSPlugin({
            paths,
            styleExtensions: ['.css', '.scss', '.vue']
        })
    ]
});

//自动补全css前缀
exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: () => [
            require('autoprefixer')
        ]
    }
});

//rem转换px
exports.px2rem = () => ({
    loader: 'px2rem-loader',
    options: {
        remUnit: 75
    }
});

