const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");

module.exports.addTeacher = async (req, res, next) => {
  try {
    const { name, depart } = req.body;
    if (!name | !depart) {
      return res.status(202).json({ message: "Fill the details correctly" });
    }
    let teacher = await Teacher.create(req.body);
    await Student.updateOne(
      { _id: req.body.student },
      { $push: { teachers: teacher._id } }
    );
    return res.status(200).json(teacher);
  } catch (e) {
    next(e);
  }
};

module.exports.getTeachers = (req, res, next) => {
  const { _page, _limit } = req.query;
  const currPage = Number(_page) || 1;
  const skip = _limit * (currPage - 1);
  try {
    Teacher.find()
      .limit(_limit)
      .skip(skip)
      .populate("student")
      .then((teachers) => {
        return res.status(200).json(teachers);
      })
      .catch((e) => next(e));
  } catch (e) {
    next(e);
  }
};

module.exports.getTeacher = (req, res, next) => {
  try {
    const { id } = req.params;
    Teacher.findOne({ _id: id })
      .then((teacher) => {
        return res.status(200).json(teacher);
      })
      .catch((e) => next(e));
  } catch (e) {
    next(e);
  }
};

module.exports.deleteTeacher = (req, res, next) => {
  const { id } = req.params;
  try {
    Teacher.findByIdAndDelete(id)
      .then(() => res.json("Deleted permanently"))
      .catch((e) => next(e));
  } catch (e) {
    next(e);
  }
};
