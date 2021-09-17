const config = require('./webpack.common.js');
const merge = require('merge-descriptors');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rulesForCss = {
  test: /\.scss$/,   
  use: [
    MiniCssExtractPlugin.loader,
    // 'style-loader',
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
        sassOptions: {
          outputStyle: "expanded",
        },
      },
    },
  ]
};

const rulesForJS = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env']
  }
};

const rules = [rulesForCss, rulesForJS];


const devConfig = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, '../src'),
      watch: true,
    },
    compress: true,
    port: 3001,
    liveReload: true,
    open: {
      app: {
        name: 'google-chrome',
      }
    },
    client: {
      overlay: true,
    },
  },
  module: { rules },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css'
    })
  ],
  devtool: 'eval-source-map'
}

module.exports = merge(config, devConfig);