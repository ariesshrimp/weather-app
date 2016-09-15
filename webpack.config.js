import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const paths = [
  '/'
]


module.exports = {
  entry: {
    main: './src/entry.js'
  },
  output: {
    filename: 'index.js',
    path: 'public',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&localIdentName=[emoji:5]!sass') },
      { test: /\.(woff|otf|png)$/, loader: 'url' }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
    // new StaticSiteGeneratorPlugin('main', paths, null)
  // ]
}
