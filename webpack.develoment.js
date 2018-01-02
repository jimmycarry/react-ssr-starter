const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const  baseCSSLoader = [
    {
        loader: 'css-loader',
        options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]-[hash:base64:5]',
            sourceMap: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({ browsers: ['last 3 versions', 'iOS 9'] }),
            ]
        }
    }
];

module.exports = [
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
                {
                    exclude: [
                        /\.html$/,
                        /\.(ts|tsx)$/,
                        /\.(js|jsx)$/,
                        /\.css$/,
                        /\.less$/,
                        /\.json$/,
                        /\.bmp$/,
                        /\.gif$/,
                        /\.jpe?g$/,
                        /\.png$/,
                      ],
                      loader: require.resolve('file-loader'),
                      options: {
                        name: '[name].[hash:8].[ext]',
                      },
                },

                {
                    test: /\.tsx?$/,
                    use: [
                        'babel-loader?cacheDirectory',
                        {
                            loader: 'ts-loader',
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.jsx?$/,
                    use: [
                        'babel-loader?cacheDirectory'
                    ]
                },
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
                {
                    exclude: [
                        /\.html$/,
                        /\.(ts|tsx)$/,
                        /\.(js|jsx)$/,
                        /\.css$/,
                        /\.less$/,
                        /\.json$/,
                        /\.bmp$/,
                        /\.gif$/,
                        /\.jpe?g$/,
                        /\.png$/,
                      ],
                      loader: require.resolve('file-loader'),
                      options: {
                        name: '[name].[hash:8].[ext]',
                      },
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        'babel-loader?cacheDirectory',
                        {
                            loader: 'ts-loader',
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.jsx?$/,
                    use: [
                        'babel-loader?cacheDirectory'
                    ]
                },
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
                {
                    test: /\.(jpe?g|png|gif)/,
                    // loader: [
                    //     'url?limit=4000&name=images/[name][hash:8].[ext]',
                    //     'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}'
                    // ]
                    loader: 'url-loader?limit=4000&name=[name][hash:8].[ext]',
                },
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
