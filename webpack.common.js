const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/renderer.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
}
