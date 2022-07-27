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

app.get("/api/:date_strinng?", (req, res) => {
  const { date_strinng } = req.params;

  const timeStamp = parseInt(date_strinng);
  const date = new Date(timeStamp || date_strinng || Date.now());
  if (!date_strinng) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  } else if (!isNaN(date)) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// listen for requests :)
let listener = app.listen(3141, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
