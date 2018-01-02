const path = require('path');
const dist = path.join(__dirname, 'dist');
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const  baseCSSLoader = [
    {
        loader: 'css-loader',
        options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]_[hash:base64:5]',
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
        'name': 'client',
        'target': 'web',
        'entry': {
            'vendor': ['react', 'react-dom'],
            'client': './client.tsx',
        },
        'output': {
            path: path.join(__dirname, 'static'),
            filename: '[name].js',
            publicPath:'/static/'
        },
        devtool: "source-map",
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
            alias: {
                "@src": path.resolve(__dirname, './src')
            }
        },
        module: {
            rules: [
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
                        'style-loader',
                        ...baseCSSLoader,
                        'less-loader',
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
				'process.env': {
					NODE_ENV: '"production"'
				}
            }),
            // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js',minChunks:Infinity }),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					drop_console: true,
					drop_debugger: true
				}
            }),
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
			new webpack.optimize.OccurrenceOrderPlugin(),
		]
    },




    {
        'name': 'server',
        target: 'node',
        entry: './server.tsx',
        output: {
            path: path.join(__dirname, 'static'),
            filename: 'server.js',
			libraryTarget: 'commonjs2',
			publicPath: '/static/',
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
            alias: {
                "@src": path.resolve(__dirname, './src')
            }
        },
        module: {
            rules: [
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
                    use: ExtractTextPlugin.extract({
                        fallback: 'isomorphic-style-loader',
                        use: [
                            ...baseCSSLoader,
                            {
                                loader:'less-loader'
                            }
                        ]
                    })
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'isomorphic-style-loader',
                        use: [
                            ...baseCSSLoader
                        ]
                    })
                }
            ]
        },
        plugins: [
			new ExtractTextPlugin({
				filename: 'styles.css',
				allChunks: true
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions: { discardComments: { removeAll: true } }
			}),
			new StatsPlugin('stats.json', {
				chunkModules: true,
				modules: true,
				chunks: true,
				exclude: [/node_modules[\\\/]react/],
			}),
		]
    }




]