require("dotenv").config();
const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const cors = require("cors");
const DbConnect = require("./database");
const corsProperties = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsProperties));

DbConnect();
app.use(express.json({ limit: "8mb" }));
app.use("/storage", express.static("storage"));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.post("/", (req, res) => {
  res.send("Hello from express js");
});

app.use(router);
