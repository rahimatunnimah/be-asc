const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 8000;

const router = require("./routes/index");

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api", router);
app.use("/", (req, res) => {
  res.send("Sukses");
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`App is running on port ${port}`);
});
