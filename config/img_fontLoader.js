exports.loadImages = ({
    include,
    exclude,
    options
} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options
                }
            }
        ]
    }
});

const SpritesmithPlugin = require('webpack-spritesmith');
exports.spriteImages = ({
    cwd,
    image,
    css
} = {}) => ({
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd,
                glob: '*.png'
            },
            target: {
                image,
                css
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        })
    ]
})