const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
require("dotenv").config();
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await Student.findOne({ _id: decoded._id });
      if (!user) {
        return res.json("You are not logged in");
      } else {
        req.student = user;
        next();
      }
    } else {
      res.json({ message: "You are not authenticated to access this route" });
    }
  } catch (e) {
    res.json({
      message: "You are not authenticated to access this route",
      error: e,
    });
  }
};
