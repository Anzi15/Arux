const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: [
        './src/js/slider.js',
        './src/js/components.js',
        './src/js/products.js',
    ],
    output:{
        filename: '[name].js',
        path: __dirname + '/dist',
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
    })],
    watch: true,
}