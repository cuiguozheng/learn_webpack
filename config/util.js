let fs = require('fs');
let join = require('path').join;

//清空构建目录
const CleanWebpackPlugin = require("clean-webpack-plugin");
exports.clean = path => ({
    plugins: [new CleanWebpackPlugin([path], {
        root: process.cwd(),
        // exclude:  ['lib'],
        verbose: true,
        // beforeEmit: true
    })]
});

//同步获取路径数组
exports.getDirSync = (startPath) => {
    let result = [];
    const finder = (path) => {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile() && val === 'index.html') result.push(path);
        });

    };
    finder(startPath);
    return result;
    // return result.filter( (item, index ,arr)=>arr.indexOf(item) === index );
};

exports.fromJSONFile = (filename) => {
    return (req, res) => {
        const data = fs.readFileSync(join(process.cwd(), 'mockData', `${filename}.json`)).toString();
        const json = JSON.parse(data);
        return res.json(json);
    };
};