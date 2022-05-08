const router = require("express").Router(); //import router which is in express
let Student = require("../models/student");

router.route("/studentAdd").post(async (req, res) => {
  const {
    nameInFull,
    nameWithInitials,
    email,
    parentMobile,
    dateOfBirth,
    password,
    address,
    expectGrade,
    role,
    gender,
    currentGrade,
    className,
    classTeacherName
  } = req.body;

  const newStudent = new Student({
    nameInFull,
    nameWithInitials,
    email,
    parentMobile,
    dateOfBirth,
    password,
    address,
    expectGrade,
    role,
    gender,
    currentGrade,
    className,
    classTeacherName
  });

  const student = await Student.findOne({ email: req.body.email });

  if (student == null) {
    await newStudent
      .save().then(() => {
        return res.status(200).send({ status: "You are added successfully!" });
      })
      .catch((err) => {
        console.log(err.message);
        return res
          .status(400)
          .send({ status: "Erro with adding your details" });
      });
  } else {
    return res
      .status(400)
      .json({ message: "You are already got admision to our school " });
  }
});

router.route("/getAllStudents").get(async (req, res) => {
  try {
    const student = await Student.find();

    if (student != null) {
      res.json(student);
    } else {
      return res
        .status(400)
        .send({ status: "there are no any students to show in the database" });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).send({ status: "erro with getting students" });
  }
});

router.route("/updateStudent").put(async (req, res) => {
  try {
    const email = req.body.email;
    const student = await Student.findOne({ email: email });
    if (student != null) {
      Object.keys(req.body).forEach((key) => {
        student[key] = req.body[key];
      });
      await student.save();
      return res
        .status(200)
        .json({ message: "Your details succussfully updated!" });
    } else {
      return res
        .status(400)
        .json({ message: "There is no any student in this email to update!" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.route("/getStudentByEmail").get(async (req, res) => {
  try {
    let email = req.body.email;
    const student = await Student.findOne({ email: email });
    if (student != null) {
      res
        .status(200)
        .send({ status: "Student details fetched successfully!", student });
    } else {
      return res
        .status(400)
        .json({ message: "There is no any student in this email!" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.route("/deleteStudent").delete(async (req, res) => {
  try {
    let email = req.body.email;

    const student = await Student.findOne({ email: email });
    //if (student.role == "admin") {
    if (student != null) {
      await student.remove();

      return res.status(200).json({ message: "Delete student successfully!" });
    } else {
      return res
        .status(200)
        .json({ message: "There is no any student to delete in this email" });
    }
    // } else {
    //   return res
    //     .status(400)
    //     .json({ message: "You have not permited to delete a student" });
    // }
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;
