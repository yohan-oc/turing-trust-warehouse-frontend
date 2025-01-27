const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/v1': { // Matches API requests starting with /v1
        target: 'https://stevett.pythonanywhere.com', // Your backend API
        changeOrigin: true,
        secure: false, // Set to true if the backend has a valid SSL certificate
        pathRewrite: { '^/v1': '/v1' } // Ensures the path remains correct
      }
    }
  }
})
