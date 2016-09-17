'use strict'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'

// Core configuration options for different build methods
module.exports = {
  devtool: 'source-maps',
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

    // XXX:jmf
    // Using this to avoid webpack-dev-server keeping the watch
    // process alive too long.
    // A convenient upshot is that we get scroll sync across clients.
    // Options taken from here:
    // https://www.npmjs.com/package/browser-sync-webpack-plugin
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      proxy: 'http://localhost:3000/tests'
    }, {
      reload: false
    })
  ]
}
