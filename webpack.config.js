    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        entry:{
            slider: './src/js/slider.js',
            components: './src/js/components.js',
            products: './src/js/components.js',

            // admin entries 
            admin : './src/js/admin.js',
            admin_login: './src/js/admin-login.js',
            admin_signup: './src/js/admin-signup.js',
            admin_components: './src/js/admin-componenets.js',
            admin_analytics: './src/js/admin-analytics.js',
            admin_products: './src/js/admin-products.js',
            admin_orders: './src/js/admin-orders.js'
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

            // admin files 
            //admin
            new HtmlWebpackPlugin({
            filename: 'admin/index.html',
            template: 'src/admin/index.html',
            chunks: ['admin', 'admin_components', 'admin_analytics']
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
            //admin products
            new HtmlWebpackPlugin({
            filename: 'admin/Products/index.html',
            template: 'src/admin/Products/index.html',
            chunks: ['admin_products', 'admin_components']
            }),
            //admin orders
            new HtmlWebpackPlugin({
            filename: 'admin/orders/index.html',
            template: 'src/admin/orders/index.html',
            chunks: ['admin_components']
            }),
        
        ],
        mode: 'development',
        devServer: {
            static: {
              directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
            watchFiles: ['src/**/*'],
        },
    }