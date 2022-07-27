// index.js
// where your node app starts

// init project
let express = require("express");
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require("cors");
const { json } = require("express");
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

app.get("/api/:date_string?", (req, res) => {
  const { date_string } = req.params;

  if (!date_string) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }
  // console.log(Date.parse(date_string));

  if (!Date.parse(date_string) && !Number(date_string)) {
    return res.json({ error: "Invalid Date" });
  }
  let integerReg = /^\d+$/;

  if (date_string.includes("-")) {
    return res.json({
      unix: new Date(date_string).getTime(),
      utc: new Date(date_string).toUTCString(),
    });
  } else if (integerReg.test(date)) {
    return res.json({
      unix: new Date(parseInt(date_string)).getTime(),
      utc: new Date(parseInt(date_string)).toUTCString(),
    });
  } else {
    return res.json({
      unix: new Date(date_string).getTime(),
      utc: new Date(date_string).toUTCString(),
    });
  }

  // if (isNaN(Date.parse(date_string))) {
  //   return res.json({
  //     unix: new Date(parseInt(date_string)).getTime(),
  //     utc: new Date(parseInt(date_string)).toUTCString(),
  //   });
  // } else {
  //   return res.json({
  //     unix: new Date(date_string).getTime(),
  //     utc: new Date(date_string).toUTCString(),
  //   });
  // }

  // if (
  //   // date_string.includes("-")
  //   parseInt(date_string) < 10000
  // ) {
  //   return res.json({
  //     unix: new Date(date_string).getTime(),
  //     utc: new Date(date_string).toUTCString(),
  //   });
  // } else {
  //   return res.json({
  //     unix: new Date(parseInt(date_string)).getTime(),
  //     utc: new Date(parseInt(date_string)).toUTCString(),
  //   });
  // }
});

// listen for requests :)
let listener = app.listen(
  // 5000,
  process.env.PORT,
  function () {
    console.log("Your app is listening on port " + listener.address().port);
  }
);
