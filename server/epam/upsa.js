const request = require('request');
const router = require('express').Router();
const mongoose = require('mongoose');

//https://upsa.epam.com/workload/rest/v3/skills/tree?itemId=4060741400372133214&skillOwnerType=employee
const URL = "https://upsa.epam.com/workload/rest/v3/skills/tree?itemId=4060741400372133214&skillOwnerType=employee";

const cookie = "DWRSESSIONID=4k8ViSbqjERaF0Xa9tGfZkRtKEm; JSESSIONID=07E70449C635DC785F8796DD7F45D72F; _ga=GA1.2.1383420707.1547617907; _ym_uid=154777829639390895; _ym_d=1547778296; __utmc=210128337; __utma=210128337.1383420707.1547617907.1555557734.1555565104.15; __utmz=210128337.1555565104.15.9.utmcsr=login.epam.com|utmccn=(referral)|utmcmd=referral|utmcct=/adfs/ls/; __utmt=1; cdnAvailable=true; __utmb=210128337.2.9.1555565105180";

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

      if(Array.isArray(c.childs) && c.childs.length===0) {
        obj[c.skillName] = {}; //[];
      }
      else {
        obj[c.skillName] = {};

      }

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
