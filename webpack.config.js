    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        entry:{
            slider: './src/js/slider.js',
            components: './src/js/components.js',
            products: './src/js/components.js',
            admin : './src/js/admin.js',
            admin_login: './src/js/admin-login.js',
            admin_signup: './src/js/admin-signup.js',
            admin_components: './src/js/admin-componenets.js'
        },
        output:{
            filename: '[name].js',
            path: __dirname + '/dist',
        },
        plugins: [
            //index.html
            new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks : ['slider','components','products']
            }),
            //admin
            new HtmlWebpackPlugin({
            filename: 'admin/index.html',
            template: 'src/admin/index.html',
            chunks: ['admin', 'admin_components']
            }),
            //admin login
            new HtmlWebpackPlugin({
            filename: 'admin/Login/index.html',
            template: 'src/admin/Login/index.html',
            chunks: ['admin_login']
            }),
            //admin signup
            new HtmlWebpackPlugin({
            filename: 'admin/Signup/index.html',
            template: 'src/admin/Signup/index.html',
            chunks: ['admin_signup']
            }),
            //admin unauthorized
            new HtmlWebpackPlugin({
            filename: 'admin/unauthorized/index.html',
            template: 'src/admin/unauthorized/index.html',
            chunks: []
            }),
        
        ],
        watch: true,
        mode: 'development',
        devServer: {
            static: {
              directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
        },
    }