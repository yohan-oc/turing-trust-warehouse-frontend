const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/turing-trust-warehouse-frontend/',
  devServer: {
    proxy: {
      "/updates": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      '/v1': { // Proxy for v1 API
        target: 'https://stevett.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/v1': '/v1' }
      }
    },
  }
})
