import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ViewAnnouncements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      announcement: [],
    };
  }

  componentDidMount() {
    this.retrieveAnnouncements();
  }

  retrieveAnnouncements() {
    axios
      .get(`http://localhost:8090/announcement/getAllAnnouncement`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            announcement: res.data.existingAnnouncement,
          });
          console.log(this.state.announcement);
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
          <h1>Announcements Dashbord</h1>
          <table class=" table table-striped borde">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Catagory</th>
                <th scope="col">toWhome</th>
                <th scope="col">from</th>
                <th scope="col">Message</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.announcement.map((announcement, index) => (
                <tr key={index}>
                  <th scope="row">A{index + 1}</th>

                  <td>{announcement.catagory}</td>
                  <td>{announcement.toWhome}</td>
                  <td>{announcement.from}</td>
                  <td>{announcement.message}</td>
                  <td>{announcement.date}</td>

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
