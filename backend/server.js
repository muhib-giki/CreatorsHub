require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.get("/", (req, res) => {
  res.send("Hello from express js");
});

app.use(router);
