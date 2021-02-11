const path = require('path')

module.exports = {
    entry: './components/board.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}