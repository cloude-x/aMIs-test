const express = require("express");
// const path = require('path')
const request = require('request');

const app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/* 转发百度amis数据 */
const CBGetAmisData = (result) => {
    app.get("/aMis/test/get", function(req, res) {
        console.log('express /aMis/test/get req', req);
        console.log('express /aMis/test/get res', res);
        
         res.json(JSON.parse(result));
     });
}

app.listen(3001, function() {
    console.log("App started on port 3001");
});

/* 调取外部百度amis数据接口 */
request('http://10.21.23.130:8069/amis/testmsg/get', function (error, response, body) {
    console.log(1111, error); // 输出请求到的body
    console.log(2222, response); // 输出请求到的body
    console.log(3333, body); // 输出请求到的body
    if (!error && response.statusCode === 200) {
        console.log(44444, body); // 输出请求到的body
        CBGetAmisData(body);
    }
});
// request('https://apis.juhe.cn/simpleWeather/query?city=%E4%B8%8A%E6%B5%B7&key=10ac1519bdbe166bcd8bbcc7ab85be99', function (error, response, body) {
//     console.log(1111, error); // 输出请求到的body
//     console.log(2222, response); // 输出请求到的body
//     console.log(3333, body); // 输出请求到的body
//     if (!error && response.statusCode === 200) {
//         console.log(44444, body); // 输出请求到的body
//     }
// });