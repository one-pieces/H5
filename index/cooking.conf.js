const cooking = require('cooking');
const CopyWebpackPlugin = require('copy-webpack-plugin');

cooking.set({
  entry: {
    app: './src/index.js'
  },
  publicPath: './',
  dist: './dist',
  template: 'index.html',
  devServer: {
    port: 8080,
    hostname: 'localhost',
    publicPath: '/'
  },
  clean: true,
  hash: true,
  extractCSS: true,
  extends: ['vue', 'lint']
});

cooking.add('plugin.copy', new CopyWebpackPlugin([
  // {dist}/to/file.txt
  { from: './src/images/QRCode/', to: './src/images/QRCode/' }
  // { from: '../config.js.etpl', to: '../mobile/config.js.etpl' }
]));

let config = cooking.resolve();
if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map';
}

module.exports = config;