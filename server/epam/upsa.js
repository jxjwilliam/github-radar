const request = require('request');
const router = require('express').Router();

const URL = "https://upsa.epam.com/workload/rest/v3/skills/tree?itemId=4060741400372133214&skillOwnerType=employee";

const cookie = "DWRSESSIONID=TGSoPFBqfa3MFzIKa0nA4qi9oDm; JSESSIONID=982AF73B5CF982B698841BD2368F7721; _ga=GA1.2.1383420707.1547617907; _gcl_au=1.1.1348874273.1547778282; _ym_uid=154777829639390895; _ym_d=1547778296; __utmc=210128337; __utma=210128337.1383420707.1547617907.1554109249.1554115533.8; __utmz=210128337.1554115533.8.3.utmcsr=login.epam.com|utmccn=(referral)|utmcmd=referral|utmcct=/adfs/ls/; __utmt=1; cdnAvailable=true; __utmb=210128337.2.9.1554115534080"
const headers = {
  "content-type": "application/json",
  'User-Agent': 'request',
  "Cookie": cookie
}

// The following cookies are necessary.
const upsa_cookies = {
  "DWRSESSIONID": "TGSoPFBqfa3MFzIKa0nA4qi9oDm",
  "JSESSIONID": "BBBD90DD6A4EE354911C9A2F1683E09F",
  "OAID": "dffb1120810f865fa2b82bdce8cb47c1"
}

/**
 * EPAM Competencies
 * General Software Engineering
 * INDUSTRY and DOMAIN EXPERTISE
 * Miscellaneous Engineering
 * Non-Engineering
 */

var obj = {}
const level = data => {
  var dc = data.childs;
  if(Array.isArray(dc) && dc.length>0) {

    if(data.skillName) {
      obj[data.skillName] = {};
    }

    dc.map(c => {
      obj[c.skillName] = {}
      level(c)
    });
  }
}

// const level1 = info => info.childs.map(c => c.skillName)
//
//
// const level2 = info => {
//   return info.childs.map(c1 => c1.childs.map(c2 => c2.skillName))
// }
//
// const level3 = info => {
//   return info.childs.map(c1 => {
//     return c1.childs.map(c2 => {
//       return c2.childs.map(c3 => c3.skillName)
//     })
//   })
// }
//
// const level4 = info => {
//   return info.childs.map(c1 => {
//     return c1.childs.map(c2 => {
//       return c2.childs.map(c3 => {
//         return c3.childs.map(c4 => {
//           if (c4.skillName) {
//             console.log(JSON.stringify(c4.skillName))
//           }
//         })
//       })
//     })
//   })
// }


let level1 = [], level2 = [], level3 = [], level4 = [];
//let obj = {};

const tdd = info => {

  info.childs.forEach(c1 => {

    level1.push(c1.skillName);
    obj[c1.skillName] = {};

    c1.childs.forEach(c2 => {
      level2.push(c2.skillName)
      obj[c1.skillName][c2.skillName] = {}

      c2.childs.forEach(c3 => {
        level3.push(c3.skillName)
        //obj[c1.skillName][c2.skillName][c3.skillName] = []

        c3.childs.forEach(c4 => {
          level4.push(c4.skillName)
          // how many levels ????
          //c4.childs.forEach(c5 => console.log(JSON.stringify(c5)));
        })

        obj[c1.skillName][c2.skillName][c3.skillName] = level4
      })
    })
  })
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

      // console.log(typeof info, Array.isArray(info.childs)); //object, true

      // console.log(level1(info));
      // console.log('--------------');
      // console.log(level2(info));
      // console.log('==============');
      // console.log(level3(info));
      //
      // console.log('~~~~~~~~~~~~~');
      // var all = tdd(info);
      // console.log(obj);

      level(info)

      //console.log(obj);

      res.status(200).send(obj);
    })
  });

module.exports = router;
