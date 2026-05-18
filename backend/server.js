const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",
  require("./routes/authRoutes")
);
// ROUTES
app.use(
  "/api/employees",
  require("./routes/employeeRoutes")
);

app.use(
  "/api",
  require("./routes/aiRoutes")
);
app.use(
  "/api/protected",
  require("./routes/protectedRoutes")
);
// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected");

  app.listen(process.env.PORT, () => {

    console.log(
      `Server running on port ${process.env.PORT}`
    );

  });

})

.catch((err) => {

  console.log(err);

});