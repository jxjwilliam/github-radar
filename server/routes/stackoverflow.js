const express = require('express')
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('Stack Overflow');
})

const SearchOptions = {}

// /2.2/search/advanced?order=desc&sort=activity&q=reactjs&site=stackoverflow
// https://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&q=reactjs&filter=default
const URL = "https://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&filter=default";

router.route(['/search/:keyword', '/search/:keyword/:criteria'])
  .get((req, res) => {
    var keyword = req.params.keyword;

    if (/\s+/.test(keyword)) {
      keyword = keyword.replace(/\s+/g, '+');
    }

    url = URL + '&q=' + keyword;

    const options = {
      url: url,
      headers: headers
    };

    console.log('searching: ', url);

    return request(options, (err, response, body) => {
      if (err) {
        res.json({"error": err.toString()});
      }

      let info = JSON.parse(body);
      res.status(200).send(info);
    })
  });


module.exports = router;