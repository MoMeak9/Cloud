const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? './': '/',
  productionSourceMap:false,
    // eslint-disable-next-line no-unused-vars
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production'){
      return {
        plugins: [new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
        })]
      }
    }
  }
}