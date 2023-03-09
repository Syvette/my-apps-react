const express = require("express");
const app = express();
const port = 3002;

app.get("/", (req, res) => {
  res.send(`Server is operational, welcome.`);
});

app.listen(port, () => {
  console.log(`BE Server is running on port ${port}...`);
});
