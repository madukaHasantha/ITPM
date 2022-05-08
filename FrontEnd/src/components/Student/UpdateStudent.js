import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../Input/Input';

const UpdateStudent = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
	const [errorMessage, setErrorMessage] = useState("");
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

  useEffect(()=> {
    getStudent()
  },[])

	const clearErrors = (key) => {
		setValidationErrors((pre) => ({ ...pre, [key]: '' }));
		setErrorMessage("")
	};

	const validateInputs = () => {
		let isValid = true;
		Object.keys(student).forEach((key) => {
      if(key === 'approved' && key === "__v"){
        if (!student[key]) {
          setValidationErrors((pre) => ({
            ...pre,
            [key]: `${key
              .replace(/([A-Z])/g, ' $1')
              .trim()
              .toUpperCase()} field is required`
          }));
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
			await udpateStudent();
		} else {
			console.log('NOT VALID');
		}
	};

	const udpateStudent = async () => {
		try {
			const isAdmin = localStorage.getItem('isAdmin', 'false');

			const response = await axios.put(
				'http://localhost:8090/student/updateStudent',
				{ ...student, isApproved: isAdmin }
			);
      if(response.status === 200){
        alert('Student details updated successfully')
        navigate('/students')
      }else{
				setErrorMessage("error while updating the student details")
			} 
		} catch (error) {
			setErrorMessage("error while updating the student details")
		}
	};

  const getStudent = async () => {
    setLoading((prev) => true);
    try {
      const res = await axios.get(`http://localhost:8090/student/getstudent/${id}`);
      if(res.status === 200){
        setStudent(res.data.student);
      }
    } catch (error) {
      console.log(error)
    }
    setLoading((prev) => false);
  }

  if(loading){
    return (
      <div className='container'>
        <h1>Loading...</h1>
      </div>
    )
  }
	return (
		<div className='container'>
			<form className='row g-3 m-3' onSubmit={onSubmit}>
				<div className='col-md-12'>
					<div className='col-md-12 py-2'>
						<h1>Update student</h1>
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
							if (key !== 'role'&& key !== 'approved'&& key !== '_id'&& key !== '__v') {
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

export default UpdateStudent;