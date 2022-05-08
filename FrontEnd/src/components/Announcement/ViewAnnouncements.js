import React, { Component } from "react";
import axios from "axios";
import swl from 'sweetalert'
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
              axios.delete(`http://localhost:8090/announcement/deleteAnnouncement/${id}`).then((res) => {

                  swl('Announcement successfully Deleted',{
                    icon: "success",
                  });
                  //rederect to the accommodation page
                  this.retrieveAnnouncements();
              })                
          }
        });
  }

  onEdit = (id) => {
    window.location=`/anouncements/edit/${id}`
}
//link buttin
onReport = () => {
  window.location=`/anouncements/Report`
}


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2"></div>
        </div>
        <div className="py-4">
          <h1>Announcements Dashbord</h1>

          <div style={{textAlign:'right', margin:'50px 0px'}}>
            <Link to="/anouncements/add" className="btn btn-warning">
              <i className=""></i>&nbsp;Publish Announcement
            </Link>            
          </div>
      
          <table class=" table table-striped borde">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Catagory</th>
                <th scope="col">ToWhome</th>
                <th scope="col">From</th>
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
                  <td>{announcement.date.substring(0, 10)}</td>

                  <td>
                    <button className="btn btn-warning" onClick={() => this.onEdit(announcement._id)}>
                      <i className="fas fa-edit"></i> &nbsp;Update
                    </button>
                    &nbsp;
                    <Link to="#" type="button" class="btn btn-danger" onClick={() => this.onDelete(announcement._id)}>
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{textAlign:'right', margin:'50px 0px'}}>
        <button className="btn btn-warning" onClick={() => this.onReport()}>
                      <i className="fas fa-edit"></i> &nbsp;Download reports
                    </button>          
      </div>

        </div>
      </div>
    );
  }
//btn download reports

}
