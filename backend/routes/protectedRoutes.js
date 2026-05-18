const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  protect,

  (req, res) => {

    res.json({

      success: true,

      message:
        "Welcome to Protected Dashboard",

      user: req.user,
    });
  }
);

module.exports = router;