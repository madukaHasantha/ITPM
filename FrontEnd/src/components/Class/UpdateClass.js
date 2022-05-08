import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAlert from "../../providers/alertProvoder";
import UpdateStudentsModal from "./UpdateStudentModal";
import BackIcon from "../../assets/left-arrow-svgrepo-com.svg";

function UpdateClass() {
	const navigate = useNavigate();
	const { classID } = useParams();

	const [modalShow, setmodalShow] = useState(false);
	const [studentsList, setstudentsList] = useState([]);
	const [teachersList, setteachersList] = useState([]);
	const [isLoadedteachers, setisLoadedteachers] = useState(true);
	const [isfinishedsubmit, setisfinishedsubmit] = useState(true);
	const [formerror, setformerror] = useState(false);
	const { setcustomAlert } = useAlert();

	const [classData, setClassData] = useState({ classGreade: "", className: "", classTeacher: "" });

	function handleFormInput(value, field) {
		setClassData((prev) => {
			prev[field] = value;
			return prev;
		});
	}
	function submitForm() {
		if ((classData.classGreade !== "", classData.className !== "", classData.classTeacher !== "")) {
			const students = studentsList;

			setformerror(false);
			setisfinishedsubmit(false);
			axios
				.put(`http://localhost:8090/class/updateClass`, { ...classData, students })
				.then((res) => {
					setisfinishedsubmit(true);
					setcustomAlert({ msg: "Update Successful", timeout: 3000, type: "success" });
				})
				.catch((error) => {
					setisfinishedsubmit(true);
					setcustomAlert({ msg: "Error Occured", timeout: "2000", type: "error" });
				});
		} else {
			setformerror(true);
			setisfinishedsubmit(true);
		}
	}

	useEffect(() => {
		setisLoadedteachers(false);
		axios
			.get(`http://localhost:8090/teacher/getAllTeachers`)
			.then((res) => {
				if (res.data && Array.isArray(res.data)) {
					// console.log(res.data[0].nameWithInitials);
					const tempList = [];
					res.data.forEach((element) => {
						tempList.push({ fullName: element.firstName, id: element._id });
					});
					setteachersList(tempList);
					setisLoadedteachers(true);
				}
			})
			.catch((error) => {
				setcustomAlert({ msg: "Error Occured", timeout: "2000", type: "error" });
				setisLoadedteachers(true);
			});
	}, [setcustomAlert]);

	useEffect(() => {
		axios({ method: "post", url: `http://localhost:8090/class/getClassByName`, data: { className: classID } })
			.then((res) => {
				if (res.data) {
					const classes = res.data.classes;
					setClassData({
						classGreade: classes.classGreade,
						className: classes.className,
						classTeacher: classes.classTeacher,
					});
					setstudentsList(classes.students);
				}
			})
			.catch((error) => {
				console.log(error);
				setcustomAlert({ msg: "Error Occured", timeout: "2000", type: "error" });
			});
	}, [setcustomAlert, classID]);

	const handleModalShow = () => {
		setmodalShow((prev) => !prev);
	};

	function removeSelected(student) {
		setstudentsList((prev) => {
			return prev.filter((item) => item !== student);
		});
	}
	return (
		<>
			<UpdateStudentsModal
				show={modalShow}
				handleClose={handleModalShow}
				setStudentList={setstudentsList}
				studentsList={studentsList}
			></UpdateStudentsModal>
			<div className="container">
				<div className=" d-flex flex-col">
					<img
						src={BackIcon}
						alt="bakcIcon"
						width={"24px"}
						style={{ margin: "8px", transition: "all 0.3s linear " }}
						onClick={(e) => {
							navigate("/classes");
						}}
					></img>

					<h1>Update the Class</h1>
				</div>
				<br></br>
				<div className="row">
					<div className="col">
						<select
							value={classData && classData.classGreade}
							onChange={(e) => handleFormInput(e.target.value, "classGreade")}
							className="form-select"
							aria-label="classes-list"
						>
							<option defaultValue value={""}>
								Select the Class
							</option>
							<option value="g1">Grade 1</option>
							<option value="g2">Grade 2</option>
							<option value="g3">Grade 3</option>
							<option value="g4">Grade 4</option>
							<option value="g5">Grade 5</option>
						</select>
					</div>
					<div className="col">
						{isLoadedteachers ? (
							<select
								value={classData && classData.classTeacher}
								onChange={(e) => handleFormInput(e.target.value, "classTeacher")}
								className="form-select"
								aria-label="Default select example"
							>
								<option defaultValue value={""}>
									Select The Class Teacher
								</option>
								{teachersList &&
									teachersList.map((teacher) => {
										return (
											<option key={teacher.id} value={teacher.fullName}>
												{teacher.fullName}
											</option>
										);
									})}
							</select>
						) : (
							<select className="form-select">
								<option defaultValue disabled>
									Loading...
								</option>
							</select>
						)}
					</div>
					<div className="col">
						<input
							value={classData && classData.className}
							type={"text"}
							// onChange={(e) => handleFormInput(e.target.value, "className")}
							className="form-control "
							placeholder="Name of the Class"
							disabled
							style={{ cursor: "no-drop" }}
						></input>
					</div>
				</div>
				{formerror && (
					<div className="row mt-3">
						<Alert variant="danger">Invalid Data</Alert>
					</div>
				)}
				<hr></hr>
				<div className="row">
					<div className="col-sm">
						<h2>Students</h2>
					</div>
					<div className="col-sm">
						<button className="btn btn-warning m-2" onClick={handleModalShow}>
							Add students
						</button>
						<Button variant="success" onClick={submitForm}>
							{!isfinishedsubmit ? (
								<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							) : (
								<></>
							)}
							Update
						</Button>
					</div>
				</div>
				<div className="row">
					<table className="table table-striped">
						<thead>
							<tr>
								<td>#</td>
								<td>Name</td>
								<td>Remove</td>
							</tr>
						</thead>
						<tbody>
							{studentsList &&
								studentsList.map((student, index) => (
									<tr key={index + 1}>
										<td>{index + 1}</td>
										<td>{student}</td>
										<td>
											<button className="btn btn-danger" onClick={() => removeSelected(student)}>
												<i className="far fa-trash-alt"></i>&nbsp;Delete
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default UpdateClass;
