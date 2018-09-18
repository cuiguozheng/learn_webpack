// 正常解析sass
exports.loadSass = ({
    include,
    exclude,
    use = []
} = {}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include,
                    exclude,
                    use: ["style-loader", "css-loader"].concat(use)
                }
            ]
        }
    };
};

//fast-sass
exports.fastSass = () => 'fast-sass-loader';

//抽离sass
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.extractSass = ({
    include,
    exclude,
    use = []
} = {}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
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
exports.purifySass = ({ paths }) => ({
    plugins: [
        new PurifyCSSPlugin({ 
            paths
        })
    ]
});
