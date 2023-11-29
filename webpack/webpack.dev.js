const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SlackWebpackTemplatePlugin = require('@tinyspeck/slack-webpack-template-plugin');

module.exports = {
  name: 'basic-express-testing',

  // base folder
  context: path.resolve(__dirname, '..'),

  // entry points
  entry: {
    index: path.resolve('src', 'js', 'index.ts'),
  },

  output: {
    path: path.resolve('public', 'dist'),
    filename: `[name].bundle.js`,
    publicPath: '/',
    pathinfo: true,
    crossOriginLoading: 'anonymous',
  },

  mode: 'development',

  node: false,

  devtool: 'inline-source-map',

  devServer: {
    host: 'localhost',
    hot: true,
    port: 1988,
  },

  optimization: {
    runtimeChunk: {
      // separate webpack manifest into separate file, so we can inline it in the html
      name: 'gantry-v2-manifest',
    },
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [],
              presets: [
                [
                  '@babel/preset-typescript',
                  {
                    allowNamespaces: true,
                  },
                ],
              ],
            },
          },
        ],
      },

      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),

    new MiniCssExtractPlugin({
      filename: `[name].bundle.css`,
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),

    new SlackWebpackTemplatePlugin({
      manifestFilename: 'gantry-v2-manifest',
      primaryCdnUrl: '/',
      backupCdnUrls: ['/', '/'],
      govPrimaryCdnUrl: '/',
      govBackupCdnUrls: ['/', '/'],
    }),
  ],
};
