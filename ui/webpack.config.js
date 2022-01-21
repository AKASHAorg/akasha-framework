// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const commons = require('./app.pack.conf');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV || 'development',
  target: ['web', 'es2017'],
  module: {
    rules: [
      { test: /\.ts(x)?$/, use: 'ts-loader' },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    libraryTarget: 'umd',
    publicPath: 'auto',
    filename: 'index.js',
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      safe:
        process.env.NODE_ENV === 'production' ? path.resolve(__dirname, '../.env.example') : false,
      systemvars: true,
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      __MATOMO_TRACKER_URL__: process.env.MATOMO_TRACKER_URL,
      __MATOMO_SITE_ID__: process.env.MATOMO_SITE_ID,
    }),
    new webpack.AutomaticPrefetchPlugin(),
    // new webpack.ProgressPlugin({
    //   entries: true,
    //   modules: true,
    //   modulesCount: 100,
    //   profile: true,
    // }),
  ],
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  externals: commons.externals,
  optimization: commons.optimization,
};
