const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: [
        './src/js/index.js',
        './src/js/components.js',
    ],
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
    })],
    watch: true,
}