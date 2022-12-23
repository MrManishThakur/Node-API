const express = require('express');
const { addTeacher, getTeachers, getTeacher, deleteTeacher } = require('../controllers/teacher.controller');
const router = express.Router();

router.post("/add", addTeacher);
router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.delete("/delete/:id", deleteTeacher);

module.exports = router
