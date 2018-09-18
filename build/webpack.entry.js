const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');

const htmlLoader = require('../config/htmlLoader');
const commonConfig = require('./webpack.common');
const developmentConfig = require('./webpack.development');
const productionConfig = require('./webpack.production');

const util = require('../config/util');

module.exports = env => {
    console.log(env);
    const mode = env[0];//获取webpack执行模式
    const target = env[1][''];//获取npm参数
    const PATHS = {
        src: path.join(__dirname, '../src'),
        app: path.join(__dirname, '../src', target),//入口目录
        node_modules: path.join(__dirname, '../node_modules'),
        dist: path.join(__dirname, '../dist'),
        openPage: '/'
    };
    const correctPath = fs.existsSync(PATHS.app);//判断入口目录是否合法
    const pages = correctPath ?
        util.getDirSync(PATHS.app).map(item => {
            const $path = path.relative(path.join(process.cwd(), 'src'), item);
            const name = $path.split(path.sep).join('_');//获取名字 eg:list_huangye_A
            PATHS.openPage = `html/${name}.html`;
            return htmlLoader.page({
                title: `${name}-page`,
                entry: {
                    [name]: [
                        // "webpack-dev-server/client?http://localhost:8081",
                        // "webpack/hot/dev-server",
                        path.join(item, 'index.js')
                    ]
                },
                filename: `html/${name}.html`,
                chunks: [name],
                template: path.join(item, 'index.html')
            });
        }) :
        htmlLoader. page({
            title: "Error path",
            templateContent: '错误路径',
            entry: {
                error: path.join(__dirname, '../error/index.js')
            },
            chunks: ["error"]
        });
    const config =
        mode === "production" ? productionConfig(PATHS) : developmentConfig(PATHS);
    return merge([
        commonConfig(PATHS),
        config,
        { mode: 'none' }
    ].concat(pages));

    {
        entry:
        output:
        modules:
        plugins
    }
};