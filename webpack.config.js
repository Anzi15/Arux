    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const webpack = require('webpack')
    const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

    module.exports = {
        entry:{
            //user side entries
            slider: './src/js/slider.js',
            components: './src/js/components.js',
            homepage: './src/js/homepage.js',
            products_menu: './src/js/products-menu.js',
            individual_product: './src/js/individual-product.js',
            cart: './src/js/cart.js',
            checkout: './src/js/checkout.js',
            contact: './src/js/contact.js',

            // admin entries 
            admin : './src/js/admin.js',
            admin_login: './src/js/admin-login.js',
            admin_signup: './src/js/admin-signup.js',
            admin_components: './src/js/admin-componenets.js',
            admin_products: './src/js/admin-products.js',
            admin_new_product: './src/js/admin-new-product.js',
            admin_orders: './src/js/admin-orders.js',
            admin_orders_preview: './src/js/admin-order-preview.js',
            admin_new_product_form_submission: './src/js/admin-new-product_form_submission.js',
            admin_edit_product_form_submission: './src/js/admin-edit-product_form_submission.js',
            admin_product_edit: './src/js/admin-product-edit.js',
            admin_management: './src/js/admin-management.js',
            
        },
        output:{
            filename: '[name].js',
            path: __dirname + '/dist',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // Match both .ts and .tsx files
                    use: 'ts-loader',
                    exclude: [/node_modules/, /\.d\.ts$/], // Exclude node_modules and .d.ts files
                },
                {
                    test: /\.node$/, // Match .node files
                    use: 'node-loader',
                },
                {
                    test: /\.d\.ts$/, // Ignore .d.ts files
                    use: 'ignore-loader',
                },
                // Other rules...
            ],
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx', '.node'], 
        },
        plugins: [
            new NodePolyfillPlugin(),
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer']
              }),
          
            //home page
            new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks : ['slider','components','homepage']
            }),
            //contact page
            new HtmlWebpackPlugin({
            filename: 'contact/index.html',
            template: 'src/contact/index.html',
            chunks : ['components','contact']
            }),
            //about page
            new HtmlWebpackPlugin({
            filename: 'about/index.html',
            template: 'src/about/index.html',
            chunks : ['components']
            }),

            //Products (all products menu)
            new HtmlWebpackPlugin({
                filename: 'products/index.html',
                template: 'src/Products/index.html',
                chunks : ['products_menu','components']
            }),
            //individual prodcut
            new HtmlWebpackPlugin({
                filename: 'product/index.html',
                template: 'src/Product/index.html',
                chunks : ['individual_product','components']
            }),
            //cart
            new HtmlWebpackPlugin({
                filename: 'cart/index.html',
                template: 'src/cart/index.html',
                chunks : ['cart','components']
            }),
            //checkout
            new HtmlWebpackPlugin({
                filename: 'checkout/index.html',
                template: 'src/checkout/index.html',
                chunks : ['checkout','components',]
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
            chunks: ['admin', 'admin_products', 'admin_components']
            }),

            //admin new product
            new HtmlWebpackPlugin({
            filename: 'admin/Products/new/index.html',
            template: 'src/admin/Products/new/index.html',
            chunks: ['admin','admin_new_product','admin_new_product_form_submission']
            }),
            
            //admin orders
            new HtmlWebpackPlugin({
            filename: 'admin/orders/index.html',
            template: 'src/admin/orders/index.html',
            chunks: ['admin','admin_components','admin_orders']
            }),
            //admin orders preview
            new HtmlWebpackPlugin({
            filename: 'admin/orders/preview/index.html',
            template: 'src/admin/orders/preview/index.html',
            chunks: ['admin','admin_components','admin_orders_preview']
            }),

            //admin product edit
            new HtmlWebpackPlugin({
                filename: 'admin/Products/edit/index.html',
                template: 'src/admin/Products/edit/index.html',
                chunks: ['admin','admin_edit_product_form_submission', 'admin_product_edit']
            }),

            //admin management
            new HtmlWebpackPlugin({
                filename: 'admin/management/index.html',
                template: 'src/admin/management/index.html',
                chunks: ['admin','admin_management']
            }),
        
        ],
        mode: 'development',
        watch: true,
        devServer: {
            static: {
              directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
            watchFiles: ['src/**/*'],
            client: {
                overlay: false
            }
        },
        resolve: {
            fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "util": require.resolve('util/'),
            "path": require.resolve('path-browserify'),
            "stream": require.resolve('stream-browserify'),
            "zlib": require.resolve('browserify-zlib'),
            "assert": require.resolve('assert/'),
            "buffer": require.resolve('buffer/'),
            "crypto": require.resolve('crypto-browserify'),
            "http": require.resolve('stream-http'),
            "https": require.resolve('https-browserify'),
            "os": require.resolve('os-browserify/browser'),
            "vm": require.resolve('vm-browserify'),
            "url": require.resolve('url/'),
            "constants": require.resolve('constants-browserify'),
            "querystring": require.resolve('querystring-es3'),
            "module": require.resolve('module'),
            "process": require.resolve('process/browser'),
            "child_process": false,
            "worker_threads": false,
        }
        },
        target: 'web',
    }