const fromJSONFile = require('./util').fromJSONFile;

module.exports = {
    'GET /test': fromJSONFile('test')
};