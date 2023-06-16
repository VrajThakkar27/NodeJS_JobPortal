const express = require("express");
const router = express.Router();

const student= require("../controllers/student.js");


router.get("/", student.s1);
router.get("/registerStudent",student.s2);
router.post("/registerStudent",student.s3);
router.get("/loginStudent",student.s4);
router.post("/loginStudent",student.s5);

module.exports = router;
