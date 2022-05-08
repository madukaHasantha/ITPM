const router = require("express").Router();
let Class = require("../models/class");

router.route("/classAdd").post(async (req, res) => {
	const { classGreade, className, classTeacher, students } = req.body;

	const newClass = new Class({
		classGreade,
		className,
		classTeacher,
		students,
	});

	const classes = await Class.findOne({ className: req.body.className });

	if (classes == null) {
		newClass
			.save()
			.then(() => {
				return res.status(200).json({ message: "You are successfully created a new class " });
			})
			.catch((err) => {
				console.log(err.message);
				return res.status(400).send({ status: "Erro with adding class!" });
			});
	} else {
		return res.status(400).json({ message: "You are already added this class " });
	}
});

router.route("/getAllClasses").get(async (req, res) => {
	try {
		const classes = await Class.find();

		if (classes != null) {
			res.json(classes);
		} else {
			return res.status(400).send({ status: "there are no any classes to show in the database" });
		}
	} catch (e) {
		console.log(e.message);
		return res.status(400).send({ status: "erro with getting classes" });
	}
});

router.route("/updateClass").put(async (req, res) => {
	try {
		const className = req.body.className;
		const classes = await Class.findOne({ className: className });
		if (classes != null) {
			Object.keys(req.body).forEach((key) => {
				classes[key] = req.body[key];
			});
			await classes.save();
			return res.status(200).json({ message: "Class details succussfully updated!" });
		} else {
			return res.status(400).json({ message: "There is no any class in this email to update!" });
		}
	} catch (e) {
		return res.status(400).json(e);
	}
});

router.route("/getClassByName").post(async (req, res) => {
	try {
		let className = req.body.className;
		const classes = await Class.findOne({ className: className });
		if (classes != null) {
			res.status(200).send({ status: "Class details fetched successfully!", classes });
		} else {
			return res.status(400).json({ message: "There is no any class in this name!" });
		}
	} catch (e) {
		return res.status(400).json(e);
	}
});

router.route("/deleteClass").delete(async (req, res) => {
	try {
		let className = req.body.className;

		const classes = await Class.findOne({ className: className });
		//if (student.role == "admin") {
		if (classes != null) {
			await classes.remove();

			return res.status(200).json({ message: "Delete class successfully!" });
		} else {
			return res.status(200).json({ message: "There is no any class to delete in this email" });
		}
		// } else {
		//   return res
		//     .status(400)
		//     .json({ message: "You have not permited to delete a class" });
		// }
	} catch (e) {
		return res.status(400).json(e);
	}
});

module.exports = router;
