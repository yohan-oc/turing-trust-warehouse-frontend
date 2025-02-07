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
    },
  }
})
