const request = require('request');
const router = require('express').Router();

///api/delegate/github/:user
router.route('/:user')
  .get((req, res) => {
    const user = req.params.user;

    const options = {
      url: 'https://api.github.com/users/' + user + '/repos',
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