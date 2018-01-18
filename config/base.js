const baseCSSLoader = [
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

const baseLintLoader = [
    {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
            emitErrors: true
        }
    }
];

const baseFileLoader = [
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
    }
]

const baseUrlLoader = [
    {
        test: /\.(jpe?g|png|gif)/,
        loader: 'url-loader?limit=4000&name=[name][hash:8].[ext]',
    }
]

const baseTSLoader = [
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
    }
]

module.exports = {
    baseLintLoader,
    baseCSSLoader,
    baseFileLoader,
    baseUrlLoader,
    baseTSLoader,
}
