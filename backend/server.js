const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Support Desk System api" });
});

//User Routes
app.use("/api/users", require("./routes/userRoutes"));

//error handler middleware
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server started on ${process.env.NODE_ENV}, on port ${PORT}`);
});
