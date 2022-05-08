const router = require('express').Router();
let Teacher = require('../models/Teacher.model');

router.route('/').get((req, res) => {
    Teacher.find()
        .then(Teacher => res.json(Teacher))
        .catch(Teacher => res.status(400).json('Error: ' + err));
});


//Add Function

router.route('/add').post((req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const dateOfBirth = req.body.dateOfBirth;
    const password = req.body.password;
    const address = req.body.address;
    const idNumber = req.body.idNumber;
    const role = req.body.role;
    const gender = req.body.gender;
    const className = req.body.className;
    



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
        className,
        

    });



    newTeacher.save()
        .then(() => res.json('Teacher added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get Data 
router.route('/:id').get((req, res) => {
    Teacher.findById(req.params.id)
        .then(Teacher => res.json(Teacher))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Data

router.route('/:id').delete((req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
        .then(() => res.json('Teacher deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Update data
router.route('/update/:id').post((req, res) => {
    Teacher.findById(req.params.id)
        .then(Teacher => {
            Teacher.firstName = req.body.firstName;
            Teacher.lastName = req.body.lastName;
            Teacher.email = req.body.email;
            Teacher.mobile = req.body.mobile;
            Teacher.dateOfBirth = req.body.dateOfBirth;
            Teacher.password = req.body.password;
            Teacher.address = req.body.address;
            Teacher.idNumber = req.body.idNumber;
            Teacher.role = req.body.role;
            Teacher.gender = req.body.gender;
            Teacher.className = req.body.className;
            



            Teacher.save()
                .then(() => res.json('Teacher updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;