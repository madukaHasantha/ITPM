import React, { Component } from "react";
import axios from "axios";
import swl from 'sweetalert'
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


    //delete function with confirmation
    onDelete=(id)=>{

      swl({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this file!",
          icon: "warning",
          buttons: ["Cancel","Delete"],
          dangerMode: true,
        })//if user select yes as option this .then will call and delete data from the database
        .then((willDelete) => {
          if (willDelete) {
              axios.delete(`http://localhost:8090/student/deleteClass/${id}`).then((res) => {

                  swl('Student successfully Deleted',{
                    icon: "success",
                  });
                  //rederect to the accommodation page
                  this.retrieveAnnouncements();
              })                
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
                    <button className="btn btn-warning">
                      <i className="fas fa-edit"></i> &nbsp;Update
                    </button>
                    &nbsp;
                    <Link to="#" type="button" class="btn btn-danger" onClick={() => this.onDelete(student._id)}>
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </Link>
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
