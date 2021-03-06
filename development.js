const express = require('express');
const path = require('path');
const app = require('./app');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./webpack.development.js');
const compiler = webpack(config);



app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: '/static/',
    serverSideRender:true
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));
app.listen(4567);
