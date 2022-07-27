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

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  } else {
    let timeStamp = parseInt(date);
    let newDate = isNaN(timeStamp) ? new Date(date) : new Date(timeStamp);
    if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
    return res.json({ unix: newDate.getTime(), utc: newDate.toUTCString() });
  }
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
