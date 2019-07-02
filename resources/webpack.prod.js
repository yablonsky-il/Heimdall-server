const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      extractComments: true
    }),
    new BundleAnalyzerPlugin(),
  ]
});
