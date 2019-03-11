const router = require('express').Router();
const request = require('request');

// https://api.github.com/search/repositories?q=language:%s&sort=stars
// https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc

const URL = "https://api.github.com/search/repositories?";
const SUFFIX = '&sort=stars';
const headers = {
  "content-type": "application/json",
  'User-Agent': 'request'
}

const working_urls = (keyword) => ({
  'language': 'q=language:' + keyword + SUFFIX,
  'all': URL + 'q=' + keyword
})

// /api/list/search/:keyword
router.route('/search/:keyword')
  .get((req, res) => {
    var keyword = req.params.keyword;

    const options = {
      url: working_urls(keyword).all,
      headers: headers
    };

    return request(options, (err, response, body) => {
      if (err) {
        res.json({"error": err.toString()});
      }

      let info = JSON.parse(body);
      res.status(200).send(info);
    })
  });

module.exports = router;