var myFetch = require('./../utils/fetch')
var config = require('./../config/config')
var errCode = require('./../config/errCode')
var Index = {
  //get
  get: function (req, callback) {
    //这里使用了知乎日报API
    myFetch('https://news-at.zhihu.com/api/4/news/before/' + req.t, {}, function (err, data) {
      if (!err) {
        callback(null, data)
      } else {
        callback(null, errCode.SERVER_ERR)
      }
    })
  }
}
module.exports = Index