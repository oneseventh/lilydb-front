const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api/v2', {
        target: 'https://lilydb.app/api',
        changeOrigin: true,
    })
  );
};