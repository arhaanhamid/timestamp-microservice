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

app.get("/api/:date", function (req, res) {
  const dateValue = req.params.date;
  const date = new Date();

  console.log(dateValue);
  console.log(date);
  console.log("///////////////////");
  console.log(date.setTime(dateValue));
  // console.log(date.setDate(dateValue));
  switch (dateValue) {
    case typeof Number:
      date.setTime(dateValue);
      break;
    default:
      // date.setDate(dateValue);
      break;
  }

  console.log("final date: " + date);
  const resObj = {};

  resObj.unix = date.getTime();
  resObj.utc = date.toUTCString();

  res.json(resObj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3002, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
