const { defineConfig } = require('@vue/cli-service');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    before: function (app) {
      app.use(
          '/api',
          createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
          })
      );
    },
  },
});