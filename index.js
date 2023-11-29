// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const dateValue = req.params.date;
  let date = new Date();

  if (dateValue === undefined) {
    console.log("Empty Parameters, so showing cuurent date.");
  } else {
    date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      //proper date
    } else {
      date = new Date().setTime(dateValue);
      // date.setTime(dateValue);

      if (isNaN(date.getTime())) {
        res.json({ error: "Invalid Date" });
      }
    }
  }

  console.log(date);
  const resObj = {};
  resObj.unix = date.getTime();
  resObj.utc = date.toUTCString();

  res.json(resObj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3002, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
