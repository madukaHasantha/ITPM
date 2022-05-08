import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ViewClasses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
    };
  }

  componentDidMount() {
    this.retrieveClasses();
  }

  retrieveClasses() {
    axios.get(`http://localhost:8090/class/getAllClasses`).then((res) => {
      if (res.data.success) {
        this.setState({
          classes: res.data.existingClasses,
        });
        console.log(this.state.classes);
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
              {this.state.classes.map((classes, index) => (
                <tr key={index}>
                  <th scope="row">S{index + 1}</th>

                  <td>{classes.classGreade}</td>
                  <td>{classes.className}</td>
                  <td>{classes.classTeacher}</td>

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
