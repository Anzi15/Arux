    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        entry: [
            './src/js/slider.js',
            './src/js/components.js',
            './src/js/products.js',
        ],
        entry:{
            slider: './src/js/slider.js',
            components: './src/js/components.js',
            products: './src/js/components.js',
            admin : './src/js/admin.js',
            admin_login: './src/js/admin-login.js',
            admin_signup: './src/js/admin-signup.js',
        },
        output:{
            filename: '[name].js',
            path: __dirname + '/dist',
        },
        plugins: [
            //index.html
            new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
            }),
            //admin
            new HtmlWebpackPlugin({
            filename: 'admin/index.html',
            template: 'src/admin/index.html',
            chunks: ['admin', 'components']
            }),
            //admin login
            new HtmlWebpackPlugin({
            filename: 'admin/Login/index.html',
            template: 'src/admin/Login/index.html',
            chunks: ['admin_login', 'components']
            }),
            //admin signup
            new HtmlWebpackPlugin({
            filename: 'admin/Signup/index.html',
            template: 'src/admin/Signup/index.html',
            chunks: ['admin_signup', 'components']
            }),
        
        ],
        watch: true,
    }