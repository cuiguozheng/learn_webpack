const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
exports.page = ({
    template = require.resolve(
        "html-webpack-plugin/default_index.ejs"
    ),
    title,
    filename,
    entry,
    chunks
} = {}) => ({
    entry,
    plugins: [
        new HtmlWebpackPlugin({
            title,
            // filename: `${path && path + "/"}index.html`,
            filename,
            template,
            chunks,
            inject: 'body',
            hash: true
        }),
        new AddAssetHtmlPlugin({
            includeSourcemap: false, 
            filepath: path.join(process.cwd(), 'lib/vendors.dll.js')
        })
    ]
});