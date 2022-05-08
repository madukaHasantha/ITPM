const router = require('express').Router();
const Admin = require('../models/admin');

//admin login
router.route('/adminLogin').post(async (req, res) => {
	try {
		let { email, password } = req.body;
		const admin = await Admin.findOne({ email: email });
		if (admin != null) {
			if (admin.password == password) {
				return res.status(200).json({
					message: 'Login successfully!',
					admin: admin
				});
			} else {
				return res.status(400).json({
					message: 'Wrong password!'
				});
			}
		} else {
			return res.status(400).json({
				message: 'There is no any admin in this email!'
			});
		}
	} catch (e) {
		return res.status(400).json(e);
	}
});

//admin register
router.route('/adminRegister').post(async (req, res) => {
	try {
		let { email, password } = req.body;
		const admin = await Admin.findOne({ email: email });
		if (admin != null) {
			return res.status(400).json({
				message: 'There is already an admin in this email!'
			});
		} else {
			const newAdmin = new Admin({
				email: email,
				password: password,
				role: 'admin'
			});
			await newAdmin.save();
			return res.status(200).json({
				message: 'Admin register successfully!',
				admin: newAdmin
			});
		}
	} catch (e) {
		return res.status(400).json(e);
	}
});

module.exports = router;