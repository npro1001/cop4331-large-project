// const { createProxyMiddleware } = require('http-proxy-middleware');
// const app = require('express')

// module.exports = function(app) {
//   app.use(
//     '/api/spotify',
//     createProxyMiddleware({
//       target: 'http://localhost:5555',
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     '/api/users',
//     createProxyMiddleware({
//       target: 'http://localhost:5555',
//       changeOrigin: true,
//     })
//   );
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5555',
      changeOrigin: true,
    })
  );
};