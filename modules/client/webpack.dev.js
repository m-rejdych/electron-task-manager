const { merge } = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    filename: '[name].js',
  },
  devServer: {
    port: 3000,
    hot: true,
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
});
