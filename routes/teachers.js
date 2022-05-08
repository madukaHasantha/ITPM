const router = require("express").Router(); //import router which is in express
let Teacher = require("../models/teacher");

router.route("/addTeacher").post(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    dateOfBirth,
    password,
    address,
    idNumber,
    role,
    gender,
    className
  } = req.body;

  const newTeacher = new Teacher({
    firstName,
    lastName,
    email,
    mobile,
    dateOfBirth,
    password,
    address,
    idNumber,
    role,
    gender,
    className
  });

  const teacher = await Teacher.findOne({ idNumber: req.body.idNumber });

  if (teacher == null) {
    await newTeacher
      .save()
      .then(() => {
        return res.status(200).send({ status: "teacher added successfully!" });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(400).send({ status: "erro with adding teacher" });
      });
  } else {
    return res.status(400).json({ message: "This teacher already exist!" });
  }
});

router.route("/getAllTeachers").get(async (req, res) => {
  try {
    const teacher = await Teacher.find();

    if (teacher != null) {
      res.json(teacher);
    } else {
      return res
        .status(400)
        .send({ status: "there is no any teacher to show in the database" });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).send({ status: "erro with getting teacher" });
  }
});

router.route("/updateTeacher").put(async (req, res) => {
  try {
    const teacherid = req.body.idNumber;
    const teacher = await Teacher.findOne({ idNumber: teacherid });
    if (teacher != null) {
      Object.keys(req.body).forEach((key) => {
        teacher[key] = req.body[key];
      });
      await teacher.save();
      return res
        .status(200)
        .json({ message: "Your details succussfully updated!" });
    } else {
      return res
        .status(400)
        .json({ message: "There is no any teacher in this ID to update!" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.route("/getTeacherById").get(async (req, res) => {
  try {
    let teacherId = req.body.idNumber;
    const teacher = await Teacher.findOne({ idNumber: teacherId });
    if (teacher != null) {
      res
        .status(200)
        .send({ status: "Teacher details fetched successfully!", teacher });
    } else {
      return res
        .status(400)
        .json({ message: "There is no any teacher in this ID!" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.route("/deleteTeacher").delete(async (req, res) => {
  try {
    let teacherId = req.body.idNumber;

    const teacher = await Teacher.findOne({ idNumber: teacherId });
    //if (teacher.role == "admin") {
    if (teacher != null) {
      await teacher.remove();

      return res.status(200).json({ message: "Delete teacher successfully!" });
    } else {
      return res
        .status(200)
        .json({ message: "There is no any teacher to delete in this ID" });
    }
    // } else {
    //   return res
    //     .status(400)
    //     .json({ message: "You have not permited to delete a teacher" });
    // }
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router; // export the module
