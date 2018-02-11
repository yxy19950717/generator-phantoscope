const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackServerConfig = require('./serverConfig');
const dllLib = require('./dllLib');

const TestPlugin = require('./plugins/testPlugin.js');

module.exports = {
  cache: true,
  context: path.resolve(__dirname, '../src/'),
  devtool: '#source-map',
  entry: {
    index: [
      'react-hot-loader/patch', 
      `webpack-dev-server/client?http://${webpackServerConfig.host}:${webpackServerConfig.port}`,
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, '../src/index.js')
    ],
    vendor: dllLib
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].[hash:12].js',
    publicPath: `http://${webpackServerConfig.host}:${webpackServerConfig.port}/`,
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.less', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              'es2015',
              'react'
            ]
          }
        },
        exclude: /^node_modules$/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 分离第三方assets
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    // 文件映射表
    new ManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      chunks: ['manifest', 'vendor', 'index'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    // uglify
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        mangle: true,
        output: { comments: false },
        compress: { warnings: false }
      },
      sourceMap: false,
      cache: true
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../public/lib/debug/manifest.json') // eslint-disable-line
    }),
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /(en-gb|zh-cn).js/
    ),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, '../public/lib/debug/lib.js'),
        outputPath: 'public/lib/debug',
        publicPath: 'public/lib/debug',
        includeSourcemap: false
      }
    ])
  ]
}