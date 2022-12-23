const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(12);
const Student = require("../models/student.model");
require("dotenv").config();

module.exports.createStudent = async (req, res) => {
  const { name, email, password, number } = req.body;
  try {
    if (!name | !email | !password | !number) {
      return res.status(202).json({ msg: "Fill the detials" });
    }
    const checkEmail = await Student.findOne({ email });
    if (checkEmail) {
      return res.status(202).json({ msg: "Email already exists" });
    }
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await Student.create({ ...req.body, password: hashPassword });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

module.exports.loginStudent = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email | !password) {
    return res.json("Fill correct details");
  }
  const user = await Student.findOne({ email });
  if (!user) {
    return res.status(202).json({ message: "User doesn't exists" });
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return res.status(202).json({ message: "Invalid data" });
  }
  let token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY);
  return res.json({ user, token });
};

module.exports.findAllStudent = (req, res, next) => {
  Student.find()
    .then((r) => {
      return res.json(r);
    })
    .catch((e) => {
      next(e);
    });
};

module.exports.findStudent = (req, res, next) => {
  const { id } = req.params;
  Student.findOne({ _id: id })
    .then((r) => {
      return res.json(r);
    })
    .catch((e) => next(e));
};
