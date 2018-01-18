const webpackDev = require('./webpack.development');
const webpackProd = require('./webpack.production');
console.log(process.env.NODE_ENV);
const config = process.env.NODE_ENV === 'production' ? webpackProd : webpackDev;
module.exports = config;
