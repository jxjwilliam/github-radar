const request = require('request');
const router = require('express').Router();

const SearchOptions = {
  repositories: ['repositories'],
  code: ['code'],
  commits: ['commits', 'application/vnd.github.cloak-preview'],
  issues: ['issues', 'application/vnd.github.symmetra-preview+json'],
  users: ['users'],
  labels: ['labels', 'application/vnd.github.symmetra-preview+json'],
  topics: ['topics', 'application/vnd.github.mercy-preview+json'],
  'text match metadata': ['labels', 'application/vnd.github.v3.text-match+json']
};

const URL = "https://api.github.com/search/";  //repositories?
const SUFFIX = '&sort=stars';
const headers = {
  "content-type": "application/json",
  'User-Agent': 'request'
}

const working_urls = (keyword) => ({
  'language': 'q=language:' + keyword + SUFFIX,
  'all': URL + 'q=' + keyword
})


// https://api.github.com/search/repositories?q=language:%s&sort=stars
// https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
// /api/list/search/:keyword, /api/github/v1/search/:keyword
router.route(['/search/:keyword', '/search/:keyword/:criteria'])
  .get((req, res) => {
    var keyword = req.params.keyword;
    var criteria = req.params.criteria.toLowerCase();

    if(SearchOptions[criteria][1]) {
      headers.Accept = SearchOptions[criteria][1];
    }

    if(/[,;]/.test(keyword)) {
      //https://api.github.com/search/repositories?q=topic:ruby+topic:rails
      keyword = 'topic:'+keyword.split(',').join('+topic:')
    }
    if(/\s+/.test(keyword)) {
      keyword = keyword.replace(/\s+/g, '+');
    }

    url = URL + SearchOptions[criteria][0] + '?q=' + keyword;

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