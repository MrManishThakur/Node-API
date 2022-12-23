require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const conn = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to databse"))
  .catch(() => console.log("error"));

module.exports = conn;