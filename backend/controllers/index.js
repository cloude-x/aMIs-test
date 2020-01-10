var Indexs = require('./../models/index')
var Index = {
  //get '/'
  index: function (req, res, next) {
    res.render('index', { title: 'Express' });
  },
  //api/get
  get: function (req, res) {
    Indexs.get(req.query, function (err, data) {
      console.log(req.query, err, data)
      if (err) {
        res.json({ status: 500, msg: err })
      } else {
        res.json(data)
      }
    })
  }
}
module.exports = Index