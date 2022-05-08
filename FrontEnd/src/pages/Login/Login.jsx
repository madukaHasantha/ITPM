import axios from 'axios';
import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import { useNavigate } from 'react-router-dom';

const Login = ({isAdmin}) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    loginUser()
  }

  const loginUser = async() => {
    const url = isAdmin ? "http://localhost:8090/admin/adminlogin" : "http://localhost:8090/student/student-login";
    try {
      const response = await axios.post(url, authData);
      if(response.status === 200){
        localStorage.setItem('isAuth', true);
        localStorage.setItem('email', authData.email);
        if(isAdmin){
          localStorage.setItem('isAdmin', true);
        }else{
          localStorage.setItem('user', JSON.stringify(response.data.student));
          localStorage.setItem('isAdmin', false);
        }
        navigate('/students');
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }
	return (
		<div className='container'>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<h1>{isAdmin ? ("Admin") : ("Student")} Login</h1>
				</div>
			</div>

			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<form onSubmit={handleSubmit}>
            {
              Object.keys(authData).map((key, index) => {
                return (
                  <Input
                    key={index}
                    name={key}
                    value={authData[key]}
                    onChange={handleChange}
                    type={key === 'password' ? 'password' : 'email'}
                    label={key.toUpperCase()}
                    placeholder={`YOUR ${key.toUpperCase()}`}
                    required={true}
                  />
                )
              })
            }
            <div className="row mx-1 my-3">
              <button type='submit' className='btn btn-primary'>Login</button>
            </div>
          </form>
				</div>
			</div>
      {
        !!error && (
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='alert alert-danger'>
                {error}
              </div>
            </div>
          </div>

        )
      }
		</div>
	);
};

export default Login;
