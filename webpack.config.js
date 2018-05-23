var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: path.resolve(__dirname + '/app/index.html'),
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: path.resolve(__dirname + '/app/index.js'),
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            { test: /\.(png|jpg|gif)$/,
                use: [ 'url-loader?limit=8192']
            }
        ]
    },
    output: {
        filename: 'transformed.js',
        path: path.resolve(__dirname + '/build')
    },
    plugins: [
        HTMLWebpackPluginConfig
    ]
};