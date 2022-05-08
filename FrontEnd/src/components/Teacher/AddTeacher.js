import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles.css'


const checkSymbol = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/gm);

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};


export default class AddTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            mobile: Number,
            dateOfBirth: Date,
            password: "",
            conPassword: "",
            address: "",
            idNumber: "",
            gender: "",
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                mobile: 0,
                dateOfBirth: Date,
                password: "",
                address: "",
                idNumber: "",
            }
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 4
                        ? "FirstName must have minimum 4 characters"
                        : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 5 || value.length > 30
                        ? "Last Name must have minimum 5 characters"
                        : "";
                break;
            case "email":
                formErrors.email = checkSymbol.test(value)
                    ? " "
                    : "Email not valid";
                break;
            case "mobile":
                formErrors.mobile =
                    value.length > 10 || value.length < 10
                        ? "Mobile Number must have 10 digit"
                        : 0;
            case "dateOfBirth":
                formErrors.dateOfBirth =
                    value.length < 0
                        ? "Date of Birth is required"
                        : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 8 || value.length > 20
                        ? "Password should have minimum 8 characters"
                        : "";
                break;
            case "address":
                formErrors.address =
                    value.length < 5
                        ? "Address value is not enough"
                        : "";
                break;
            case "idNumber":
                formErrors.idNumber =
                    value.length > 12 || value.length < 10
                        ? "NIC number should have characters 10 or 12"
                        : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
        this.setState({
            ...this.state,
            [name]: value
        });
    };


    onSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, mobile, dateOfBirth, address, idNumber, password, gender } = this.state;
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            dateOfBirth: dateOfBirth,
            address: address,
            idNumber: idNumber,
            password: password,
            gender: gender
        }

        //console.log(data)
        const response = axios.post("http://localhost:8090/teacher/addTeacher", data).then((res) => {
            if (response.status === 200) {
                toast.success(`${firstName} Register success`);
                this.setState(
                    {
                        firstName: "",
                        lastName: "",
                        email: "",
                        mobile: Number,
                        dateOfBirth: Date,
                        password: "",
                        address: "",
                        idNumber: "",
                        gender: "",
                    }
                )
            } else {
                // toast.error("You have an Error in Inserting");
            }
        });
    };


    render() {
        const { formErrors } = this.state;
        return (
            <>
                <div className="container containerTop">
                    {/* <div className="row">
					<div className="col position-relative link">
						<p><Link to="/supplier">Supplier Management</Link> {'>'} Add New Supplier</p>
					</div>
				</div> */}
                    <div className="row">
                        <div className="col-9 position-relative">
                            <h1 className='display-5 fw-bold'>Personal Information</h1>
                            < ToastContainer />
                        </div>
                        <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                    </div>
                    <div className="row">
                        <div className="col-2" />
                        <div className="col-8 shadowBox" >
                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='name'>First Name</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='firstName'
                                                value={this.state.firstName}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                            {formErrors.firstName.length > 4 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.firstName}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='form-group '>
                                            <label htmlFor='supplierId'>Last Name</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='lastName'
                                                placeholder=''
                                                value={this.state.lastName}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                            {formErrors.lastName.length < 5 || formErrors.lastName.length > 30 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.lastName}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='email'>Email</label>
                                            <input
                                                type='email'
                                                className='form-control'
                                                name='email'
                                                placeholder='jane@gmail.com'
                                                value={this.state.email}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                            {formErrors.email.length > 0 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='phoneNumber'>Mobile</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='mobile'
                                                placeholder='0112222222'
                                                value={this.state.mobile}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                            {formErrors.mobile.length > 10 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.mobile}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='email'>Date Of Birth</label>
                                            <input
                                                type='date'
                                                className='form-control'
                                                name='dateOfBirth'
                                                value={this.state.dateOfBirth}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                            {formErrors.dateOfBirth.length > 0 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.dateOfBirth}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='gender'>Gender</label><br/>
                                            
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label" for="inlineRadio1">Male: </label>
                                                <input class="form-check-input" type="radio" name="gender" onChange={this.handleInputChange} value="male" />
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label" for="inlineRadio2">Female: </label>
                                                <input class="form-check-input" type="radio" name="gender" onChange={this.handleInputChange}  value="female" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='phoneNumber'>CV</label>
                                            <input
                                                type='file'
                                                className='form-control'
                                                name='file'
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='phoneNumber'>Cover letter</label>
                                            <input
                                                type='file'
                                                className='form-control'
                                                name='file'
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='address'>Address</label>
                                            <textarea
                                                className='form-control'
                                                name='address'
                                                placeholder='Address'
                                                value={this.state.address}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                            {formErrors.address.length > 5 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.address}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='br_number'>NIC Number</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='idNumber'
                                                placeholder='NIC'
                                                value={this.state.idNumber}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                            {formErrors.idNumber.length > 10 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.idNumber}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='product_name'>Password</label>
                                            <input
                                                type='password'
                                                className='form-control'
                                                name='password'
                                                value={this.state.password}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                            {formErrors.password.length > 8 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.password}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='form-group'>
                                            <label htmlFor='product_price'>Confirm Password</label>
                                            <input
                                                type='password'
                                                className='form-control'
                                                name='conPassword'
                                                // value={this.state.conPassword}
                                                onChange={this.handleInputChange}
                                            // required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4" />
                                    <div className="col-4">
                                        <button type='submit' className='btn btn-primary sub_btn'>Register</button>
                                    </div>
                                    <div className="col-4" />
                                </div>
                            </form>
                        </div>
                        <div className="col-2" />
                    </div>
                </div >
            </>
        )
    }
}
