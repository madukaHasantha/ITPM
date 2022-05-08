import React from 'react';
import Login from '../../pages/Login/Login';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';
import ViewStudents from './ViewStudents';

const StudentIndex = ({}) => {
	const isAuth = localStorage.getItem('isAuth');
  const isAdmin = localStorage.getItem('isAdmin');
	if (!isAuth) {
		return <Login />;
	}
	if(isAdmin=='true'){
    return <AdminDashboard />;
  }else{
    return <StudentDashboard />;
  }
};

export default StudentIndex;
