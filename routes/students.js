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
    classTeacherName,
  } = req.body;

  const isApproved = req.body.isAdmin || false;

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
    classTeacherName,
    approved : isApproved
  });

  const student = await Student.findOne({ email: req.body.email });

  if (student == null) {
    await newStudent
      .save()
      .then(() => {
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

router.get("/getAllStudents", (req, res) => {
  Student.find().select('-password').exec((err, student) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingStudent: student,
    });
  });
});

// router.route("/getAllStudents").get(async (req, res) => {
//   try {
//     const student = await Student.find();

//     if (student != null) {
//       res.json(student);
//     } else {
//       return res
//         .status(400)
//         .send({ status: "there are no any students to show in the database" });
//     }
//   } catch (e) {
//     console.log(e.message);
//     return res.status(400).send({ status: "erro with getting students" });
//   }
// });

router.route("/updateStudent").put(async (req, res) => {
  try {
    const id = req.body._id;
    const student = await Student.findById(id);
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
    let id = req.body.id;
    const student = await Student.findById(id);
    if (student != null) {
      await student.remove();

      return res.status(200).json({ message: "Delete student successfully!" });
    } else {
      return res
        .status(200)
        .json({ message: "There is no any student to delete in this email" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.put('/approveStudent', async (req, res) => {
	try {
		let id = req.body.id;
		const student = await Student.findById(id);
		if (student != null) {
			student.approved = true;
			await student.save();
			return res
				.status(200)
				.json({ message: 'Student approved successfully!' });
		} else {
			return res
				.status(400)
				.json({
					message: 'There is no any student in this email to approve!'
				});
		}
	} catch (e) {
		return res.status(400).json(e);
	}
});

router.post('/student-login', async(req, res) => {
  try {
    let {email, password} = req.body;
    const student = await Student.findOne({ email: email });
    if (student != null) {
      if(student.approved == true){
        if (student.password == password) {
          return res
            .status(200)
            .json({ message: 'Login Successful!', student });
        } else {
          return res
            .status(400)
            .json({ message: 'Incorrect Password!' });
        }
      }else{
        return res
          .status(400)
          .json({ message: 'Your account is not approved yet!' });  
      }
    } else {
      return res
        .status(400)
        .json({ message: 'There is no any student in this email or username!' });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
})

router.get('/getstudent/:id', async(req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    if (student != null) {
      return res
        .status(200)
        .json({ message: 'Student fetched successfully!', student });
    } else {
      return res
        .status(400)
        .json({ message: 'There is no any student in this id!' });  
    }
  } catch (e) {
    return res.status(400).json(e);
  }
})

module.exports = router;
