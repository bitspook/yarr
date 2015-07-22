var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    filename: 'dist/[name].js'
  },
  devServer: {
    contentBase: './'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?optional=runtime', 'virtual-dom'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
            'sass?sourceMap'
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};
