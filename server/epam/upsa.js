const request = require('request');
const router = require('express').Router();
const mongoose = require('mongoose');

const URL = "https://upsa.epam.com/workload/rest/v3/skills/tree?itemId=4060741400372133214&skillOwnerType=employee";

const cookie = "DWRSESSIONID=TGSoPFBqfa3MFzIKa0nA4qi9oDm; JSESSIONID=CDE760F7BDEAA40EED6EC0FC77188C50; _ga=GA1.2.1383420707.1547617907; _gcl_au=1.1.1348874273.1547778282; _ym_uid=154777829639390895; _ym_d=1547778296; __utmc=210128337; __utma=210128337.1383420707.1547617907.1554181836.1554184776.11; __utmz=210128337.1554184776.11.6.utmcsr=login.epam.com|utmccn=(referral)|utmcmd=referral|utmcct=/adfs/ls/; __utmt=1; cdnAvailable=true; __utmb=210128337.2.9.1554184777077"
const headers = {
  "content-type": "application/json",
  'User-Agent': 'request',
  "Cookie": cookie
}

/**
 * EPAM Competencies
 * General Software Engineering
 * INDUSTRY and DOMAIN EXPERTISE
 * Miscellaneous Engineering
 * Non-Engineering
 */
const level1 = (info, obj) => info.childs.forEach(c => {
  obj[c.skillName] = {};
  level(c, obj[c.skillName])
})

// the top object has no 'skillName', so separately.
const level = (data, obj) => {

  var dc = data.childs;

  if (Array.isArray(dc) && dc.length > 0) {

    dc.forEach(c => {
      obj[c.skillName] = {};

      level(c, obj[c.skillName])
    });
  }
}

// TODO: Spoken Languages:
/**
 * make:
 *  Slovak: {},
 *  Slovenian: {},
 *  Spanish: {},
 *  Swedish: {},
 *  'Swiss German': {},
 *  Telugu: {},
 *  Turkish: {},
 *  Ukrainian: {},
 *  Uzbek: {} }, ...
 * to:
 *  ['Slovak', 'Slovenian', 'Spanish', 'Swedish', ...]
 */

// In the schema just use a field as object and put the JSON there.

var JSONSchema = new mongoose.Schema({
  skills: Object,
  created_at: Date,
  updated_at: Date
})

var Skill = mongoose.model('Skill', JSONSchema);

// save data
const save_skills = data => {
  var skills_data = new Skill({skills: JSON.stringify(data)});
  skills_data.save()
    .then(item => console.log('saved'))
    .catch(err => console.log(err))
}

router.route('/')
  .get((req, res) => {

    const options = {
      url: URL,
      method: 'GET',
      headers: headers
    }

    return request(options, (err, response, body) => {
      if (err) {
        res.json({"error": err.toString()});
      }

      //console.log(typeof body, Array.isArray(body)); //string, false
      let info = JSON.parse(body);
      var obj = {}

      // console.log(typeof info, Array.isArray(info.childs)); //object, true
      level1(info, obj)

      save_skills(obj);

      res.status(200).json(obj);
    })
  });

module.exports = router;
