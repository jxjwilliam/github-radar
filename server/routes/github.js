const request = require('request');
const router = require('express').Router();

// https://api.github.com/search/repositories?q=language:%s&sort=stars
// https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc

var data = [];
// data['issues_url'],
//   data['deployments_url'],
//   data['stargazers_count'],
//   data['forks_url'],
//   data['mirror_url'],
//   data['subscription_url'],
//   data['notifications_url'],
//   data['collaborators_url'],
//   data['watchers'],
//   data['name'],
//   data['language'],
//   data['url'],
//   data['created_at'],
//   data['pushed_at'],
//   data['forks_count'],
//   data['default_branch'],
//   data['teams_url'],
//   data['trees_url'],
//   data['branches_url'],
//   data['subscribers_url'],
//   data['stargazers_url']

// data[items].reduce((arr, item) => {
//   arr.push({
//     'crated': item['created_at'],
//     'updated': item['updated_at'],
//     'name': item['name'],
//     'forks': item['forks'],
//     'stars': item['stargazers_count'],
//     'size': item['size']
//   })
// }, []);

router.route('/search/:keyword')
  .get((req, res) => {
    var keyword = trim(req.params.keyword);

    const options = {
      url: 'https://api.github.com/search/repositories?q=language:' + keyword + '&sort=stars',
      headers: {
        "content-type": "application/json",
        'User-Agent': 'request'
      }
    };

    console.log('keyword ---', options.url);

    return request(options, (err, response, body) => {
      if (err) {
        res.json({"error": err.toString()});
      }

      let info = JSON.parse(body);
      res.status(200).send(info);
    })
  });

module.exports = router;