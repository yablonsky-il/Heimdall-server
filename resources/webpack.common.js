const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // entry: path.join(path.resolve(), 'src/server.js'),
  entry: path.join(path.resolve(), 'src/server.ts'),
  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve('public'),
      to: 'public',
    }]),
    new CleanWebpackPlugin(),
  ],
};
