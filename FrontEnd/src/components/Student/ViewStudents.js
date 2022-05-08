import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default class ViewStudents extends Component {
	isAdmin = localStorage.getItem('isAdmin');
	doc = new jsPDF();
	constructor(props) {
		super(props);

		this.state = {
			student: [],
			filteredStudents: [],
			loading: false
		};
	}

	componentDidMount() {
		this.retrieveStudent();
	}

	generateStudentReport = () => {
		this.doc.text('Students Report', 10, 10);
		this.doc.autoTable({ html: '#my-table' });
		this.doc.autoTable({ theme: 'grid' });
		let array = [];
		this.state.student.map((f, idx) => {
			let item = [];
			item.push(idx + 1);
			item.push(f.nameInFull);
			item.push(f.gender);
			item.push(f.email);
			item.push(f.address);
			item.push(f.dateOfBirth);
			item.push(f.expectGrade);
			array.push(item);
			return item;
		});

		this.doc.autoTable({
			head: [
				[
					'#',
					'Name',
					'Gender',
					'Email',
					'Address',
					'Birth day',
					'Grade'
				]
			],

			body: array
		});

		this.doc.save('Students.pdf');
	};

	searchStudent(e) {
		// filter users from state
		const student = this.state.student.filter((st) => {
			return (
				st.nameInFull
					.toLowerCase()
					.includes(e.target.value.toLowerCase()) ||
				st.nameWithInitials
					.toLowerCase()
					.includes(e.target.value.toLowerCase()) ||
				st.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
				st.parentMobile
					.toLowerCase()
					.includes(e.target.value.toLowerCase()) ||
				st.dateOfBirth
					.toLowerCase()
					.includes(e.target.value.toLowerCase()) 
			
			);
		});
		this.setState({ filteredStudents: student });
	}

	retrieveStudent() {
		this.setState({ loading: true });
		axios
			.get(`http://localhost:8090/student/getAllStudents`)
			.then((res) => {
				if (res.data.success) {
					this.setState({
						student: res.data.existingStudent,
						filteredStudents: res.data.existingStudent
					});
				}
			});
		this.setState({ loading: false });
	}
	approveStudent = async (id) => {
		try {
			const response = await axios.put(
				'http://localhost:8090/student/approveStudent',
				{ id: id }
			);
			if (response.status === 200) {
				const students = this.state.student;
				const index = students.findIndex(
					(student) => student._id === id
				);
				students[index].approved = true;
				this.setState({
					student: students
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	deleteUser = async (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			try {
				const response = await axios.delete(
					`http://localhost:8090/student/deleteStudent`,
					{
						data: {
							id: id
						}
					}
				);
				if (response.status === 200) {
					const students = this.state.student;
					const index = students.findIndex(
						(student) => student._id === id
					);
					students.splice(index, 1);
					this.setState({
						student: students
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	render() {
		if (this.state.loading) {
			return <div>Loading...</div>;
		}
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-lg-9 mt-2 '>
						<h1>Student Dashbord</h1>
					</div>
				</div>
				<div className=''>
					<div className='row pb-3 justify-content-end'>
						{/* searchbar */}
						<div className='col-lg-3'>
							<Input
								type='text'
								placeholder='Search'
								onChange={(e) => this.searchStudent(e)}
							/>
						</div>
					</div>
					<table class=' table table-striped borde'>
						<thead class='thead-dark'>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>nameInFull</th>
								<th scope='col'>email</th>
								<th scope='col'>parentMobile</th>
								<th scope='col'>dateOfBirth</th>
								<th scope='col'>address</th>
								<th scope='col'>expectGrade</th>
								<th scope='col'>role</th>
								<th scope='col'>gender</th>
								<th scope='col'>Approve</th>
							</tr>
						</thead>
						<tbody>
							{this.state.filteredStudents.map(
								(student, index) => (
									<tr key={index}>
										<th scope='row'>A{index + 1}</th>

										<td>{student.nameInFull}</td>
										<td>{student.email}</td>
										<td>{student.parentMobile}</td>
										<td>{student.dateOfBirth}</td>
										<td>{student.address}</td>
										<td>{student.expectGrade}</td>
										<td>{student.role}</td>
										<td>{student.gender}</td>
										<td>
											<div class='form-check'>
												<input
													class='form-check-input'
													type='checkbox'
													value={student.approved}
													checked={student.approved}
													onChange={() => {
														this.approveStudent(
															student._id
														);
													}}
												/>

												{student.approved
													? 'Approved'
													: 'Pending'}
											</div>
										</td>

										<td>
											<Link
												to={`/update-student/${student._id}`}
												className='btn btn-outline-primary'>
												<i className='fas fa-edit'></i>{' '}
												&nbsp;Update
											</Link>
											&nbsp;
											<button
												className='btn btn-danger'
												onClick={() => {
													this.deleteUser(
														student._id
													);
												}}>
												<i className='far fa-trash-alt'></i>
												&nbsp;Delete
											</button>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
					<Link to='/add-student' className='btn btn-warning'>
						<i className='fas fa-user-plus'></i>&nbsp;Add
					</Link>
					&nbsp;
				</div>
				{/* button to download the report */}
				{this.state.student.length > 0 && (
					<div className='row justify-content-end'>
					<div className='col-md-2'>
						<button
							className='btn btn-success'
							onClick={() => {
								this.generateStudentReport();
							}}>
							Download Report
						</button>
					</div>
				</div>
				)}
			</div>
		);
	}
}
