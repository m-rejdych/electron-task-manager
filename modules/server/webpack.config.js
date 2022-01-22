const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.[contenthash:8].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'auto',
  },
  mode: 'production',
  node: false,
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ]
  }
};
