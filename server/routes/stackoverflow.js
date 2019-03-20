const express = require('express')
const router = express.Router();
const request = require('request');
const zlib = require('zlib');

const headers = {
  "content-type": "application/json",
  "Accept": "text/html,application/xhtml+xml,application/xml,application/json",
  "User-Agent": "request",
  'Accept-Encoding': 'gzip'
}

// /2.2/search/advanced?order=desc&sort=activity&q=reactjs&site=stackoverflow
// https://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&q=reactjs&filter=default
const PREFIX = "https://api.stackexchange.com/2.2/search/advanced?key=";
const SUFFIX = "&site=stackoverflow&order=desc&sort=activity&filter=default";
const KEY = "5zKPVUV9moMdf8vmqAI6uQ((";

router.route(['/search/:keyword', '/search/:keyword/:criteria'])
  .get((req, res) => {
    var keyword = req.params.keyword;

    if (/\s+/.test(keyword)) {
      keyword = keyword.replace(/\s+/g, '+');
    }

    const url = PREFIX + KEY + SUFFIX + '&q=' + keyword;

    const options = {
      url: url,
      method: 'GET',
      headers: headers
    };

    request(options).pipe(zlib.createGunzip()).pipe(res);
  });


module.exports = router;
