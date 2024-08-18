const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin() // Limpia la carpeta dist antes de cada build
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // Minifica el CSS
      new TerserPlugin() // Minifica el JavaScript
    ],
    splitChunks: {
      chunks: 'all' // Optimiza y separa el código compartido
    }
  }
});
