/* 入口文件 */
const express = require('express')
const http = require('http')
const path = require('path')
const ejs = require('ejs')
const router = require('./routes/index')
const app = express();
router(app); //拆分路由
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); //静态文件服务位置
app.engine('.html', ejs.__express);//使用.html做为后缀
// app.set('view engine', 'html'); //使用ejs为模版引擎

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port http://localhost:' + app.get('port'));
});