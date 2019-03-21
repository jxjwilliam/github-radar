const request = require('request');
const router = require('express').Router();

const URL = "https://search.channel9.msdn.com/api/v1/documents?text=";
const SUFFIX = '&pageSize=30&pageNumber=1&languages=en';
const headers = {
  "content-type": "application/json",
  'User-Agent': 'request'
}

router.route('/search/:keyword')
  .get((req, res) => {
    var keyword = req.params.keyword;
    var url = URL;

    if(keyword) {
      url += keyword.replace(/\s+/g, '+') + SUFFIX;
    }
    else {
      url += "epam" + SUFFIX;
    }

    const options = {
      url: url,
      method: 'GET',
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