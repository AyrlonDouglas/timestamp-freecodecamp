require("dotenv").config();

const express = require("express");
const logs = require("./src/helpers/Logs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/src/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/views/index.html");
});
app.get("/api", (req, res) => {
  let date = new Date();
  const utc = date.toUTCString();
  const unix = date.getTime();

  res.json({ utc, unix });
});
app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  if (!Date.parse(date) && !Number(date)) {
    res.json({ error: "Invalid Date" });
  } else if (!/[-]/.test(req.params.date) && Number(req.params.date)) {
    let dateE = new Date(Number(date));

    res.json({
      utc: dateE.toUTCString(),
      unix: dateE.getTime(),
    });
  } else {
    let dateE = new Date(date);
    res.json({
      unix: dateE.getTime(),
      utc: dateE.toUTCString(),
    });
  }
});
const port = process.env.PORT;
app.listen(port, () => logs.success("Aplicação iniciada na porta " + port));
