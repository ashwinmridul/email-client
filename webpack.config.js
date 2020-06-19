// Imports: Dependencies
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

// Webpack Configuration
const config = {
  // Entry
  entry: './src/index.jsx',

  // Output
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },

  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // CSS Files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },

  devServer: {
    historyApiFallback: true
  },

  // Plugins
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: true
    })
  ],

  // Reload On File Change
  watch: true,

  // Development Tools (Map Errors To Source File)
  devtool: 'source-map'
};

// Exports
module.exports = config;