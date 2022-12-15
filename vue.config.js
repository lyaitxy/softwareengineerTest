const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
    
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://124.223.6.87:10004',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/cs': {
        target: 'http://124.223.6.87:10004',
        changeOrigin: true,
        pathRewrite: {
          '^/cs': ''
        }
      },
      '/file': {
        target: 'http://124.223.6.87:10004',
        changeOrigin: true,
        pathRewrite: {
          '^/file': ''
        }
      }
    }
  },
  lintOnSave: false,
}