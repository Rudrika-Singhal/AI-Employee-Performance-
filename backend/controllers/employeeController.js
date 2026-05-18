const Employee = require("../models/Employee");

// ADD EMPLOYEE
const addEmployee = async (req, res) => {

  try {

    const employee =
      await Employee.create(req.body);

    res.status(201).json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {

  try {

    const employees =
      await Employee.find();

    res.json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// SEARCH EMPLOYEE
const searchEmployee = async (req, res) => {

  try {

    const { department } = req.query;

    const employees =
      await Employee.find({
        department,
      });

    res.json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  searchEmployee,
};