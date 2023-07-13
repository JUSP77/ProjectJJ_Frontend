const { createProxyMiddleware } = require('http-proxy-middleware');
const { defineConfig } = require('@vue/cli-service');

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