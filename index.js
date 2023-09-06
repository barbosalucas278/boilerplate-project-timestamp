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
  try {
    let date = new Date();
    const param = req.params.date;
    if (param == null) {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
    if (isDateValid(param)) {
      date = new Date(param);
    } else {
      if (isUnixDate(param)) {
        date = new Date(parseInt(param));
      } else {
        res.json({ error: "Invalid Date" });
      }
    }
    //validaciones de parametro
    const response = {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
    res.json(response);
  } catch (error) {
    res.json({ error: "Invalid Date" });
  }
});

const isDateValid = (stringDate) => {
  const date = new Date(stringDate);
  return date === "Invalid Date" || !isNaN(new Date(stringDate));
};

const isUnixDate = (stringDate) => {
  return !isNaN(stringDate);
};
// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
