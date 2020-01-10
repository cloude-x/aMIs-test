/* 路由集合 */
var index = require('./../controllers/index')
module.exports = (app) => {
  app.get('/', index.index);
  app.get('/api/get', index.get);
}