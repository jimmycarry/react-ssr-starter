const path = require('path');
const webpack = require('webpack');

const { baseLintLoader, baseCSSLoader, baseUrlLoader, baseFileLoader, baseTSLoader } = require('./config/base');

module.exports = [

    // CLIENT
    {
        name: 'client',
        target: 'web',
        entry: {
            vendor: ['react', 'react-dom'],
            client: ['webpack-hot-middleware/client?quiet=true&reload=true', './client.tsx']

        },
        output: {
            path: path.join(__dirname, 'static'),
            filename: '[name].js',
            publicPath: '/static/',
            pathinfo:true
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
            alias: {
                "@src": path.resolve(__dirname, './src')
            }
        },
        devtool: "cheap-module-eval-source-map",
        module: {
            rules: [
                ...baseLintLoader,
                ...baseFileLoader,

                ...baseTSLoader,
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        ...baseCSSLoader,
                        'less-loader'
                    ]
                },
                {
                    test: /\.css/,
                    use: [
                        'style-loader',
                        ...baseCSSLoader
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("development")
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js',minChunks:Infinity }),
            new webpack.HotModuleReplacementPlugin()
        ]
    },



    // SERVER WEBPACK

    {
        name: 'server',
        target: 'node',
        entry: './server.tsx',
        output: {
            path: path.join(__dirname, 'static'),
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: '/static/',
        },
        devtool: "cheap-module-eval-source-map",
		resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
            alias: {
                "@src": path.resolve(__dirname, './src')
            }
        },
        module: {
            rules: [
                ...baseFileLoader,

                ...baseTSLoader,
                {
                    test:/\.less$/,
                    use:[
                        'isomorphic-style-loader',
                        ...baseCSSLoader,
                        'less-loader',
                    ]
                },
                {
                    test: /\.css/,
                    use: [
                        'isomorphic-style-loader',
                        ...baseCSSLoader
                    ]
                },
                ...baseUrlLoader,
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("development")
                }
            }),
            // new ExtractTextPlugin('styles.css')

        ]

    }




]
