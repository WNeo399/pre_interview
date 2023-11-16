const e = require("express");
var express = require("express");
var request = require("request");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

let makes = [];
request(
  `https://api.pricespeoplepay.com.au/1.0/api/makes`,
  function (error, response, body) {
    let data = JSON.parse(body).data;
    makes = data;
  }
);

function getMakeCode(name) {
  let res = "";
  for (let i = 0; i < makes.length; i++) {
    if (makes[i].Name == name) {
      res = makes[i].MakeCode;
      break;
    }
  }
  return res;
}

router.get("/getMakes", function (req, res, next) {
  let resp = [];
  makes.forEach(({ Name }, index) => {
    resp.push({ filter: Name });
  });
  res.send(JSON.stringify(resp));
});

router.get("/getFamilies", function (req, res, next) {
  let make = req.query.make;
  let makeCode = getMakeCode(make);
  if (makeCode) {
    request(
      `https://api.pricespeoplepay.com.au/1.0/api/modelByMakeCode?makeCode=${makeCode}`,
      function (error, response, body) {
        let resp = [];
        let data = JSON.parse(body).data;
        data.forEach(({ FamilyCode }, index) => {
          resp.push({ filter: FamilyCode });
        });
        res.send(JSON.stringify(resp));
      }
    );
  } else {
    res.send();
  }
});

router.get("/getSearchFilter", function (req, res, next) {
  let make = req.query.make;
  let makeCode = getMakeCode(make);
  let model = req.query.model;
  if (makeCode && model) {
    request(
      `https://api.pricespeoplepay.com.au/1.0/api/search-filters?isFilter=1&make=${makeCode}&model=${model}`,
      function (err, response, body) {
        res.send(body);
      }
    );
  } else {
    res.send();
  }
});

router.post("/searchAll", function (req, res, next) {
  let body = req.body;
  body.make = getMakeCode(body.make);
  let jsonBody = JSON.stringify(body);
  jsonBody.replace("fuelType", "fuel_type");
  jsonBody.replace("saleCategory", "sale_category");
  jsonBody.replace("transmissionType", "transmission");
  jsonBody.replace("stateType", "state");
  jsonBody.replace("sort", "sortBy");
  jsonBody.replace("engineDescription", "engine");
  request(
    {
      method: "GET",
      url: "https://api.pricespeoplepay.com.au/1.0/api/search-all",
      qs: JSON.parse(jsonBody),
    },
    function (err, response, body) {
      res.send(body);
    }
  );
});

module.exports = router;
