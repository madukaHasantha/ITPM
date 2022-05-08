import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import './student.styles.css';

const AdminDashboard = () => {
	const isAuth = localStorage.getItem('isAuth');
	if (!isAuth) {
		return <Login />;
	}

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-lg-9 mt-2 mb-2'>
					<h1>Admin Dashboard</h1>
				</div>
			</div>

			<div>
				{/* grid of 4 large divs */}
				<div className='container pb-5'>
					<div className='row  justify-content-center'>
						<Link
							to={`/view-students`}
							className=' col-md-3 p5 menu-item m-1'>
							<div className='menu-link'>View all Students</div>
						</Link>

						<Link
							to={`/add-student`}
							className=' col-md-3 p5 menu-item m-1'>
							<div className='menu-link'>Add student</div>
						</Link>
					</div>

					<div className='container pb-5'>
						<div className='row  justify-content-center'>
							<Link
								to={`/view-students`}
								className=' col-md-3 p5 menu-item m-1'>
								<div className='menu-link'>
									Approve Students
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
