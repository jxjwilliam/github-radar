var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Radar and Trends' });
  res.send('Redar and Trends POC');
});

module.exports = router;
