import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import "./student.styles.css"

const StudentDashboard = () => {
  const isAuth = localStorage.getItem('isAuth');
  const user = localStorage.getItem('user',"{}");
  const json_user = JSON.parse(user);
  if(!user){
    return <Login />;
  }
	
  return (
		<div className='container'>
			<div className='row'>
				<div className='col-lg-9 mt-2 mb-2'>
					<h1>Student Dashboard</h1>
				</div>
			</div>

			<div>
				{/* grid of 4 large divs */}
				<div className='container pb-5'>
					<div className='row  justify-content-center'>
						<Link
							to={`/update-student/${json_user._id}`}
							className=' col-md-3 p5 menu-item m-1'>
							<div className='menu-link'>Update profile</div>
						</Link>

            <Link
							to={`/classes`}
							className=' col-md-3 p5 menu-item m-1'>
							<div className='menu-link'>View classes</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentDashboard;
