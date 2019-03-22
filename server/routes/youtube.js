const request = require('request');
const router = require('express').Router();

// https://www.youtube.com/results?search_query=reactjs+docker+kubernetes+cloud&pbj=1
// const URL = "https://www.youtube.com/results?search_query=";
const URL = "https://content.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&key=AIzaSyCcHehvrIdujbyeiKCBaivkE3SNZLiUcYE&q=";
const headers = {
  "content-type": "application/json",
  'User-Agent': 'request',
}

router.route('/search/:keyword')
  .get((req, res) => {
    var keyword = req.params.keyword.replace(/\s+/g, '+');
    var url = URL + keyword;
    headers.referer += keyword;
    const options = {
      url: url,
      method: 'GET',
      headers: headers
    };

    console.log('searching: ', url, headers);

    return request(options, (err, response, body) => {
      if (err) {
        res.json({"error": err.toString()});
      }

      console.log(body);
      let info = JSON.parse(body);
      res.status(200).send(info);
    })
  });

module.exports = router;