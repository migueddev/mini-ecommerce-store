const path = require('node:path');
const {merge} = require('webpack-merge');
const {HotModuleReplacementPlugin} = require('webpack');
const common = require('./webpack.common.js');

/** @type {import('webpack').Configuration} */

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    hot: true, // Habilita Hot Module Replacement
    port: 5000, // Establece el puerto
    open: true // Abre el navegador automáticamente
  }
});
