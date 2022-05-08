import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAlert from "../../providers/alertProvoder";
import { Spinner } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ViewClasses() {
	const [classesList, setClassesList] = useState({ classes: [] });
	const [isUpdated, setisUpdated] = useState(false);
	const [isloading, setisloading] = useState(false);
	const { setcustomAlert } = useAlert();

	useEffect(() => {
		setisloading(true);
		axios
			.get(`http://localhost:8090/class/getAllClasses`)
			.then((res) => {
				setisloading(false);

				if (res.data) {
					setClassesList({
						classes: res.data,
					});
				}
			})
			.catch((error) => {
				setisloading(false);

				setcustomAlert({ msg: "Error occured", timeout: 5000, type: "error" });
			});
	}, [isUpdated, setcustomAlert]);

	function removeClasse(className) {
		const prmt = window.confirm("Are You Sure?");
		if (prmt) {
			setisloading(true);

			axios
				.delete(`http://localhost:8090/class/deleteClass`, { data: { className: className } })
				.then((res) => {
					setisloading(false);

					if (res.data) {
						setcustomAlert({ msg: res.data.message, timeout: 3000, type: "success" });
						setisUpdated(true);
					}
				})
				.catch((error) => {
					setisloading(false);
					setcustomAlert({ msg: "Delete Unsuccesful", timeout: 3000, type: "warning" });
				});
		}
	}

	function viewReport(classData) {
		const classStudentData =
			classesList && classesList.classes.filter((cls) => cls.className === classData.className)[0];
		const doc = new jsPDF();
		console.log(classStudentData);
		doc.setFontSize(20);
		doc.text("Class Report", 10, 10);

		// Or use javascript directly:
		doc.autoTable({
			head: [["", ""]],
			body: [
				["Class Name", ": " + classData.className],
				["Grade ", ": " + classData.classGreade],
				["Class Teacher", ": " + classData.classTeacher],
				["id", ": " + classData._id],
				// ...
			],
			theme: "plain",
			columnStyles: { 0: { halign: "center" } },
		});

		doc.autoTable({
			head: [["No", "StudentName"]],
			body: classStudentData.students.map((element, index) => {
				return [index + 1, element];
			}),
		});

		var blobPDF = new Blob([doc.output()], { type: "application/pdf" });
		var blobUrl = URL.createObjectURL(blobPDF);

		window.open(blobUrl); // will open a new tab
	}

	return isloading ? (
		<div
			style={{
				position: "absolute",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				width: "100vw",
				backgroundColor: "rgba(128,128,128,0.2)",
			}}
		>
			<Spinner variant="warning" animation="grow" style={{ height: "15vh", width: "15vh", opacity: 1 }}></Spinner>
			<Spinner variant="danger" animation="grow" style={{ height: "15vh", width: "15vh", opacity: 1 }}></Spinner>
		</div>
	) : (
		<div className="container">
			<div className="row">
				<div className="col-lg-9 mt-2 mb-2"></div>
			</div>
			<div className="py-4">
				<h1>Classes Dashbord</h1>
				<table class=" table table-striped borde">
					<thead class="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">ClassGreade</th>
							<th scope="col">ClassName</th>
							<th scope="col">ClassTeacher</th>
						</tr>
					</thead>
					<tbody>
						{classesList.classes.map((classes, index) => (
							<tr key={index}>
								<th scope="row">S{index + 1}</th>

								<td>{classes.classGreade}</td>
								<td>{classes.className}</td>
								<td>{classes.classTeacher}</td>

								<td>
									<Link
										className="btn btn-outline-primary"
										to={"/classes/update-class/" + classes.className}
									>
										<i className="fas fa-edit"></i> &nbsp;Update
									</Link>
									&nbsp;
									<button className="btn btn-danger" onClick={() => removeClasse(classes.className)}>
										<i className="far fa-trash-alt"></i>&nbsp;Delete
									</button>
								</td>
								<td>
									<button className="btn btn-success" onClick={() => viewReport(classes)}>
										<i className="far fa-trash-alt"></i>&nbsp;View Report
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Link to="/classes/add-class" className="btn btn-warning">
					<i className="fas fa-user-plus"></i>&nbsp;Add
				</Link>
				&nbsp;
			</div>
		</div>
	);
}
