const express = require('express');
const { createStudent, loginStudent, findAllStudent, findStudent } = require('../controllers/student.controller');

const router = express.Router();
router.post("/signup", createStudent);
router.post("/login", loginStudent);
router.get("/", findAllStudent);
router.get("/:id", findStudent);

module.exports = router;