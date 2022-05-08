import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ViewStudents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: [],
    };
  }

  componentDidMount() {
    this.retrieveStudent();
  }

  retrieveStudent() {
    axios.get(`http://localhost:8090/student/getAllStudents`).then((res) => {
      if (res.data.success) {
        this.setState({
          student: res.data.existingStudent,
        });
        console.log(this.state.student);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2"></div>
        </div>
        <div className="py-4">
          <h1>Student Dashbord</h1>
          <table class=" table table-striped borde">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">nameInFull</th>
                <th scope="col">email</th>
                <th scope="col">parentMobile</th>
                <th scope="col">dateOfBirth</th>
                <th scope="col">password</th>
                <th scope="col">address</th>
                <th scope="col">expectGrade</th>
                <th scope="col">role</th>
                <th scope="col">gender</th>
              </tr>
            </thead>
            <tbody>
              {this.state.student.map((student, index) => (
                <tr key={index}>
                  <th scope="row">A{index + 1}</th>

                  <td>{student.nameInFull}</td>
                  <td>{student.nameWithInitials}</td>
                  <td>{student.email}</td>
                  <td>{student.parentMobile}</td>
                  <td>{student.dateOfBirth}</td>
                  <td>{student.password}</td>
                  <td>{student.address}</td>
                  <td>{student.expectGrade}</td>
                  <td>{student.role}</td>
                  <td>{student.gender}</td>

                  <td>
                    <button className="btn btn-outline-primary">
                      <i className="fas fa-edit"></i> &nbsp;Update
                    </button>
                    &nbsp;
                    <button className="btn btn-danger">
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="emp_add" className="btn btn-warning">
            <i className="fas fa-user-plus"></i>&nbsp;Add
          </Link>
          &nbsp;
        </div>
      </div>
    );
  }
}
