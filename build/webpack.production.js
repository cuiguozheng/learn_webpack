const merge = require('webpack-merge');
const path = require('path');
const glob = require("glob");

const jsLoader = require('../config/jsLoader');
const sassLoader = require('../config/sassLoader');
const cssLoader = require('../config/cssLoader');
const img_fontLoader = require('../config/img_fontLoader');
const util = require('../config/util');

module.exports = (PATHS) => merge([
    util.clean(PATHS.dist),
    sassLoader.extractSass({
        use: [cssLoader.autoprefix(), cssLoader.px2rem(), 'sass-loader']
    }),
    cssLoader.extractCss({
        use: [cssLoader.autoprefix(), cssLoader.px2rem()]
    }),
    img_fontLoader.loadImages({
        options: {
            limit: 15000,
            name: "img/[name].[ext]",
        }
    })
]);