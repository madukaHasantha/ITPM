const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express(); // asign express to app variable
require("dotenv").config();
const res = require("express").response;

const PORT = process.env.PORT || 8090; // run my app 8070 or available port

app.use(cors());
app.use(bodyParser.json()); //

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  // connect to our db

  useNewUrlParser: true,

  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  // open the connection which is created
  console.log("mongodb connection is success!");
});

const teacherRouter = require("./routes/teachers.js"); //accsess the teacherss.js routes file
app.use("/teacher", teacherRouter); //  http://localhost:8090/teacher

const studentRouter = require("./routes/students.js");
app.use("/student", studentRouter); //  http://localhost:8090/student

const classRouters = require("./routes/classes.js");
app.use("/class", classRouters);

const announceRouters = require("./routes/announcements.js");
app.use("/announcement", announceRouters);

app.listen(PORT, () => {
  // listn to the port now
  console.log(`server is up and running on PORT Number:  ${PORT}`);
});
