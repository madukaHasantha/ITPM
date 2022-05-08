import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ViewTecahers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacher: [],
    };
  }

  componentDidMount() {
    this.retrieveTeacher();
  }

  retrieveTeacher() {
    axios.get(`http://localhost:8090/teacher/getAllTeachers`).then((res) => {
      if (res.data.success) {
        this.setState({
          teacher: res.data.existingTeacher,
        });
        console.log(this.state.teacher);
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
                <th scope="col">firstName</th>
                <th scope="col">lastName</th>
                <th scope="col">email</th>
                <th scope="col">mobile</th>
                <th scope="col">dateOfBirth</th>
                <th scope="col">password</th>
                <th scope="col">address</th>
                <th scope="col">idNumber</th>
              </tr>
            </thead>
            <tbody>
              {this.state.teacher.map((teacher, index) => (
                <tr key={index}>
                  <th scope="row">T{index + 1}</th>

                  <td>{teacher.firstName}</td>
                  <td>{teacher.lastName}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.mobile}</td>
                  <td>{teacher.dateOfBirth}</td>
                  <td>{teacher.password}</td>
                  <td>{teacher.address}</td>
                  <td>{teacher.idNumber}</td>

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
