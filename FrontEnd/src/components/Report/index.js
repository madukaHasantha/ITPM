import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Teacher = props => ( <tr >
    <td > { props.Teacher.firstName } </td> 
    <td > { props.Teacher.lastName } </td>
    <td > { props.Teacher.email } </td> 
    <td > { props.Teacher.mobile } </td> 
    <td > { props.Teacher.dateOfBirth } </td> 
    <td > { props.Teacher.address } </td> 
    <td > { props.Teacher.idNumber } </td> 
    <td > { props.Teacher.role } </td> 
    <td > { props.Teacher.gender } </td> 
    <td > { props.Teacher.className } </td> 
   
    </tr> 
)


export default class TeachersList extends Component {
    constructor(props) {
        super(props);


        this.state = {
            Teacher: []
        };
    }



    componentDidMount() {
        axios.get('http://localhost:5000/Teacher/')
            .then(response => {
                this.setState({ Teacher: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getPosts() {
        axios.get('http://localhost:5000/Teacher/')
            .then(response => {
                this.setState({ Teacher: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


   


    TeacherList() {
        return this.state.Teacher.map(currentTeacher => {
            return <Teacher Teacher = { currentTeacher }
            deleteTeacher = { this.deleteTeacher }
            key = { currentTeacher._id }
            />;
        })
    }

    handleSearchArea = (e) => {

        const searchKey = e.currentTarget.value;

        axios.get('http://localhost:5000/Teacher/').then(response => {


            const resultt = response.data
            const result = resultt.filter((props) =>
                props.firstName.includes(searchKey)
            )

            this.setState({ Teacher: result })

        });

    }


    myfunction(){
        // document.getElementById("1").style.display="none";
        //alert(document.getElementById("1"));
   
        window.print();
       }

    render() {return (
        <div class="lft">
        <div class="card" >
            <div className = "col-lg-9 mt-2 mb-2" >
            <h4 > Teacher List  </h4> </div >
            <div className = "col-lg-3 mt-2 mb-2" >
            <input className = "form-control" type = "search" placeholder = "Search" name = "searchQuery"
            onChange = { this.handleSearchArea } ></input> 
            </div > 
            </div> 
            
            <table  table class="table table-bordered">
            <thead className = "thead-light" >
            <tr >
            <th > Frist Name </th> 
            <th > Last Name </th> 
            <th > Email </th>
            <th > Mobile </th> 
            <th > Death of Birth </th>
            < th > Address </th> 
            <th > ID Number </th> 
            <th > Role </th>
            < th > Gender </th> 
            < th > Class name </th> 
            
            </tr >
            </thead> <tbody > {this.state.Teacher.map(props =>
                    <tr key = { props.firstName } >
                    <td > { props.firstName } </td> 
                    <td > { props.lastName } </td> 
                    <td > { props.email } </td> 
                    < td > { props.mobile } </td>  
                    < td > { props.dateOfBirth } </td> 
                    < td > { props.address } </td>  
                    < td > { props.idNumber } </td>
                    < td > { props.role } </td>  
                    < td > { props.gender } </td> 
                    < td > { props.className } </td>  
                   
                     <td >

                   </td></tr>)

            }

            </tbody> </table >
            <button className="btn btn-success" onClick ={this.myfunction} >Print</button>
            
            </div>
        )
    }
}