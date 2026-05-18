const express = require("express");

const router = express.Router();

const {
  addEmployee,
  getEmployees,
  searchEmployee,
} = require("../controllers/employeeController");

router.post("/", addEmployee);

router.get("/", getEmployees);

router.get("/search", searchEmployee);

module.exports = router;