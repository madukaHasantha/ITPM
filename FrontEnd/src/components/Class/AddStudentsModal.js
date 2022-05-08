import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import useAlert from "../../providers/alertProvoder";
import Loader from "../Loader/Loader";
import AddIcon from "../../assets/add-svgrepo-com.svg";
import RemoveIcon from "../../assets/remove-svgrepo-com.svg";

function AddStudentsModal({ show, handleClose, setStudentList, studentsList }) {
	const [allStudents, setallStudents] = useState([]);
	const { setcustomAlert } = useAlert();

	const [selectedStudents, setselectedStudents] = [studentsList, setStudentList];
	// const [selectedStudents, setselectedStudents] = useState(studentsList);
	const [isLoaded, setisLoaded] = useState(false);
	useEffect(() => {
		setisLoaded(false);
		axios
			.get(`http://localhost:8090/student/getAllStudents`)
			.then((res) => {
				if (res.data && Array.isArray(res.data)) {
					// console.log(res.data[0].nameWithInitials);
					const tempList = [];
					res.data.forEach((element) => {
						tempList.push({ fullName: element.nameWithInitials, id: element._id });
					});
					setallStudents(tempList);
					setisLoaded(true);
				}
			})
			.catch((error) => {
				setcustomAlert({ msg: "Error Occured", timeout: "2000", type: "error" });
				setcustomAlert({ msg: "Error Occured", timeout: "2000", type: "error" });

				setisLoaded(true);
			});
	}, [setcustomAlert]);

	function addToSelected(student) {
		// console.log(checkContains(selectedStudents, student.id));
		if (!checkContains(selectedStudents, student.id)) {
			setselectedStudents((prev) => {
				return [...prev, student];
			});
		}
	}
	function removeSelected(student) {
		setselectedStudents((prev) => {
			return prev.filter((item) => item.id !== student.id);
		});
	}
	function checkContains(arr, itemid) {
		let ret = false;
		arr.forEach((element) => {
			if (element.id === itemid) {
				ret = true;
			}
		});
		return ret;
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Select Students</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{isLoaded ? (
					<div className="container">
						<div className="row">
							<div className="col">
								<ListGroup variant="flush">
									{allStudents &&
										allStudents.map((student) => (
											<ListGroup.Item
												action
												key={student.id}
												onClick={() => addToSelected(student)}
											>
												{student.fullName}
												{/* <i class="fas fa-solid fa-plus " style={{ float: "right" }}></i> */}
												<img
													src={AddIcon}
													style={{ width: "16px", float: "right" }}
													alt="add"
												></img>
											</ListGroup.Item>
										))}
								</ListGroup>
							</div>
							<div className="col">
								<ListGroup variant="flush">
									{selectedStudents &&
										selectedStudents.map((student) => (
											<ListGroup.Item
												action
												key={student.id}
												onClick={() => removeSelected(student)}
											>
												{student.fullName}
												{/* <i class="fas fa-solid fa-minus " style={{ float: "right" }}></i> */}
												<img
													src={RemoveIcon}
													style={{ width: "16px", float: "right" }}
													alt="remove"
												></img>
											</ListGroup.Item>
										))}
								</ListGroup>
							</div>
						</div>
					</div>
				) : (
					<Loader></Loader>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button
					variant="primary"
					onClick={() => {
						setStudentList(selectedStudents);
						handleClose();
					}}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddStudentsModal;
