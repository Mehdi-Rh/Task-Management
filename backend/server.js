require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("req.path", req.path);
  console.log("req.method", req.method);
  next();
});

// connect to mongodb
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 4000;
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () =>
      console.log("Connecting to db & listening to port ", port)
    );
  })
  .catch((err) => console.log(err));

// // routes
const tasksRoutes = require("./routes/tasks");
app.use("api/tasks", tasksRoutes);

// const usersRoutes = require("./routes/users");
// app.use("api/users", usersRoutes);