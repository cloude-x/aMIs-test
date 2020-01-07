const request = require('request');

request('https://apis.juhe.cn/simpleWeather/query?city=%E4%B8%8A%E6%B5%B7&key=10ac1519bdbe166bcd8bbcc7ab85be99', function (error, response, body) {
    console.log(1111, error); // 输出请求到的body
    console.log(2222, response); // 输出请求到的body
    console.log(3333, body); // 输出请求到的body
    if (!error && response.statusCode === 200) {
        console.log(44444, body); // 输出请求到的body
    }
});