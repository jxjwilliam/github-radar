const router = require('express').Router();
const request = require('request');

// https://api.github.com/search/repositories?q=language:%s&sort=stars
// https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc

router.route('/search/:keyword')
  .get((req, res) => {
    var keyword = req.params.keyword;

    const options = {
      url: 'https://api.github.com/search/repositories?q=language:' + keyword + '&sort=stars',
      headers: {
        "content-type": "application/json",
        'User-Agent': 'request'
      }
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