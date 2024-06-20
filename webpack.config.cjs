const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',

  context: path.resolve(__dirname),

  entry: './frontend/index.tsx',

  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    crossOriginLoading: 'anonymous',
    publicPath: 'http://localhost:8080/',
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-refresh/babel'],
          },
        },
      },

      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: '[hash:base64:8]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          'sass-loader',
        ],
        include: /\.module\.s?css$/,
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
        exclude: /\.module\.s?css$/,
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(svg)$/i,
        type: 'asset/inline',
      },
    ],
  },

  resolve: {
    alias: {
      '@backend': path.resolve(__dirname, 'backend'),
      '@frontend': path.resolve(__dirname, 'frontend'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
    fallback: { url: false },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/template/index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),

    new ReactRefreshWebpackPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    hot: true,
    // open: true,
    static: ['frontend/assets'],
  },
};
