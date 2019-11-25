const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commons = require('../../app.pack.conf');
module.exports = {
  entry: './src/index.ts',
  output: {
    libraryTarget: 'system',
    //library: 'ui-widget-topbar',
    path: path.resolve(__dirname, 'dist'),
    filename: 'topbar.js',
    publicPath: '/widgets/',
  },
  mode: 'development',
  module: {
    rules: [{ parser: { System: false } }, { test: /\.ts(x)?$/, use: 'ts-loader' }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.ProgressPlugin({
      entries: true,
      modules: true,
      modulesCount: 100,
      profile: true,
    }),
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebpackPlugin(),
  ],
  devtool: 'source-map',
  externals: commons.externals,
  optimization: commons.optimization,
};
