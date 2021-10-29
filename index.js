const express = require("express");
const app = express();
const port = process.env.PORT || 4040;

app.get("/", (req, res) => {
  res.send("url is running properly, Hello Guys how are you all ?");
});

app.listen(port, () => {
  console.log("servers is running properly on live  ", port);
});
