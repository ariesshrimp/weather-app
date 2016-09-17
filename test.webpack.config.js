'use strict'
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map',
  entry: 'mocha!./test/index.js',
  output: {
    path: 'test/compiled',
    publicPath: '/tests',
    filename: 'index.bundle.js'
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      components: 'src/components',
      src: 'src'
    }
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&localIdentName=[path]__***[local]***__[emoji:1]!sass') },
      { test: /\.otf$/, loader: 'url' },
      { test: /\.(png|jpg|jpeg)$/, loader: 'file' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),

    new HTMLWebpackPlugin({
      title: 'Unit Tests'
    }),
    
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      proxy: 'http://localhost:3000/tests'
    }, {
      reload: false
    })
  ]
}
