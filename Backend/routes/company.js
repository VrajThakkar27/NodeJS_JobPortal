const express = require("express");
const router = express.Router();

const company= require("../controllers/company.js");

router.get("/registerCompany",company.c1);
router.post("/registerCompany",company.c2);
router.get("/loginCompany",company.c3);
router.post("/loginCompany",company.c4);
router.get("/getCompany/:id",company.c5);

module.exports = router;
