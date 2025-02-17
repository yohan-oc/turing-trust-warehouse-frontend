const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/turing-trust-warehouse-frontend/',
  devServer: {
    proxy: {
      '/v1': { // Proxy for v1 API
        target: 'https://stevett.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/v1': '/v1' }
      },
      '/v2': { // Proxy for v1 API
        target: 'https://stevett.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/v2': '/v2' }
      }
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Turing Trust - Warehouse Manager';
      return args;
    });
  }
})
