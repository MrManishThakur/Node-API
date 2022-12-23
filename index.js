const express = require("express");
const conn = require("./config/db");
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();

const studentRouter = require("./routes/student.route");
const teacherRouter = require("./routes/teacher.route");
const auth = require("./middlewares/auth");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get("/", (req, res) => {
  res.send("Type your route name to get your data");
});
app.use("/student", studentRouter);
app.use("/teacher", auth, teacherRouter);
app.listen(process.env.PORT, async () => {
  await conn;
  console.log(`Server running on ${process.env.PORT}`);
});
