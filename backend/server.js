require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");
const DbConnect = require("./database");
app.use(express.json());

const corsProperties = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsProperties));

DbConnect();
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.post("/", (req, res) => {
  res.send("Hello from express js");
});

app.use(router);
