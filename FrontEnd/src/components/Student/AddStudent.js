import axios from 'axios';
import React, { useState } from 'react';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';

const AddStudent = ({isAdmin}) => {
	// const isAdmin = localStorage.getItem('isAdmin', 'false');
	const navigate = useNavigate();
	const [student, setStudent] = useState({
		nameInFull: '',
		nameWithInitials: '',
		email: '',
		parentMobile: '',
		dateOfBirth: '',
		password: '',
		address: '',
		expectGrade: '',
		role: 'student',
		gender: '',
		currentGrade: '',
		className: '',
		classTeacherName: ''
	});
	const [errorMessage, setErrorMessage] = useState("")
	const [validationErrors, setValidationErrors] = useState({
		nameInFull: '',
		nameWithInitials: '',
		email: '',
		parentMobile: '',
		dateOfBirth: '',
		password: '',
		address: '',
		expectGrade: '',
		role: '',
		gender: '',
		currentGrade: '',
		className: '',
		classTeacherName: ''
	});

	const clearErrors = (key) => {
		setValidationErrors((pre) => ({ ...pre, [key]: '' }));
	};

	const validateInputs = () => {
		let isValid = true;
		Object.keys(student).map((key) => {
			if (!student[key]) {
				setValidationErrors((pre) => ({
					...pre,
					[key]: `${key
						.replace(/([A-Z])/g, ' $1')
						.trim()
						.toUpperCase()} field is required`
				}));
				console.log(key);
				isValid = false;
			} else {
				if (key === 'password') {
					if (student[key].length < 6) {
						setValidationErrors((pre) => ({
							...pre,
							[key]: `Password must be at least 6 characters`
						}));
						isValid = false;
					}
				} else if (key === 'email') {
					//regex to check if email is valid
					if (
						!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
							student[key]
						)
					) {
						setValidationErrors((pre) => ({
							...pre,
							[key]: `Email must be valid`
						}));
						isValid = false;
					}
				}
			}
		});
		return isValid;
	};

	const onChange = (e) => {
		setStudent({ ...student, [e.target.name]: e.target.value });
		clearErrors([e.target.name]);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (validateInputs()) {
			await addStudent();
		} else {
			console.log('NOT VALID');
		}
	};

	const addStudent = async () => {
		try {
			

			const response = await axios.post(
				'http://localhost:8090/student/studentAdd',
				{ ...student, isApproved: isAdmin }
			);
			if(response.status === 200){
				navigate('/students');
			}else{
				setErrorMessage("Error adding student");
			}
		} catch (error) {
			setErrorMessage(error.response.data.message);
			console.log(error);
		}
	};
	return (
		<div className='container'>
			<form className='row g-3 m-3' onSubmit={onSubmit}>
				<div className='col-md-12'>
					<div className='col-md-12 py-2'>
						<h1>{isAdmin ? ("Add student"):("Register")}</h1>
					</div>
					{
						!!errorMessage && (
							<div className='col-md-12 py-2'>
								<div className='alert alert-danger'>
									{errorMessage}
								</div>
							</div>
						)
					}
					<div className='row'>
						{Object.keys(student).map((key) => {
							if (key != 'role') {
								return (
									<Input
										key={key}
										label={key
											.replace(/([A-Z])/g, ' $1')
											.trim()
											.toUpperCase()}
										name={key}
										value={student[key]}
										onChange={onChange}
										className='col-md-6'
										isError={!!validationErrors[key]}
										errorMessage={validationErrors[key]}
										type={
											key === 'password'
												? 'password'
												: 'text'
										}
									/>
								);
							}
						})}

						<div className={`col-md-12  my-2`}>
							<label htmlFor='Submit' className='form-label'>
								ㅤ
							</label>
							<input
								type='submit'
								className='form-control bg-primary text-light'
								value='Submit'
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddStudent;
