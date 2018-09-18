const merge = require('webpack-merge');
const path = require("path");
const glob = require("glob");

const vueLoader = require('../config/vueLoader');
const jsLoader = require('../config/jsLoader');
const sassLoader = require('../config/sassLoader');
const htmlLoad = require('../config/htmlLoader');

module.exports = (PATHS) => merge([
    {
        output: {
            path: path.join(PATHS.dist),
            filename: 'js/[name].js'
        }
    },
    {
        resolve: {
            alias: {
                '@': path.resolve('src')
            }
        }
    },
    vueLoader.loadVue(),
    jsLoader.loadJs({
        include: PATHS.app
    }),
    jsLoader.eslint({
        include: path.join(process.cwd(), 'src')
    }),
    jsLoader.dllJs()
    // jsLoader.commonChunk(),
    // sassLoader.purifySass({
    //     paths: glob.sync(path.join(PATHS.app, '**'))
    //     // paths: glob.sync(PATHS.app)
    // })
]);