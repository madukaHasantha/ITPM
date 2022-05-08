import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles.css'

//set form validator 
const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};


export default class AddAnnouncement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            announcementID: "",
            catagory: "",
            toWhome: "",
            from: "",
            message: "",
            date: new Date(),
            formErrors: {
                announcementID: "",
                catagory: "",
                toWhome: "",
                from: "",
                message: ""
            }
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "announcementID":
                formErrors.announcementID =
                    value.length < 4
                        ? "Minimum characters must be 5"
                        : "";
                break;
            case "catagory":
                formErrors.catagory =
                    value.length < 1
                        ? "Please select the correct category"
                        : "";
                break;
            case "toWhome":
                formErrors.toWhome =
                    value.length < 5 || value.length > 8
                        ? "Field toWhom is required"
                        : "";
                break;
            case "from":
                formErrors.from =
                    value.length < 5
                        ? "Field from is required"
                        : "";
                break;
            case "message":
                formErrors.message =
                    value.length < 5
                        ? "Message must have minimum 5 characters"
                        : 0;
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
        try {
            e.preventDefault();        
            if (!formValid(this.state.formErrors)) {
                console.error("FORM INVALID-DISPLAY ERROR");
            }

            const { announcementID, catagory, toWhome, from, message, date } = this.state;
            const data = {
                announcementID: announcementID,
                catagory: catagory,
                toWhome: toWhome,
                from: from,
                message: message,
                date: date
            }
            
            axios.post("http://localhost:8090/announcement/announcementAdd", data).then((res) => {
                if (res.data.success) {
                    console.log(data);
                    toast.success("Announcement published");
                    this.setState(
                        {
                            announcementID: "",
                            catagory: "",
                            toWhome: "",
                            from: "",
                            message: ""
                        }
                    );
                }
            });     
            setTimeout(() => {
                window.location = "/anouncements";
            }, 2500);
            setTimeout();       
        } catch (error) {
            //toast.error("You have an Error in Inserting");
            console.log(error);
        }

    };


    render() {
        const { formErrors } = this.state;
        return (
            <div className="container containerTop">
                <div className="row">
                    <h1 className="top"></h1>
                </div>
                <div className="row">
                    
                    <div className="col-8 position-relative">
                        <h2>Publish Announcement</h2>
                        <ToastContainer />
                    </div>
                    <div className="col-3 position-relative"></div>
                    <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                </div>
                <div className="row">
                    <div className='col-1' />
                    <div className='col-10 shadowBox'>
                        <div className='row'>
                            <div className="col-6">
                                <img src="https://greatdayhr.com/wp-content/uploads/2021/08/Announcement-umumkan-informasi-terkini-44.png" alt="announcement" style={{ height: '300px', width: '100%', marginTop: '100px' }} />
                            </div>
                            <div className="col-5">
                                <div className="">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="name">Announcement ID : </label>
                                            <input type="text" className="form-control" name="announcementID" value={this.state.announcementID} onChange={this.handleInputChange} required />
                                            {formErrors.announcementID.length > 4 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.announcementID}</p>
                                            )}
                                            <p></p>
                                        </div>
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="age">Category : </label>
                                            <select className="form-control" name="catagory" onChange={this.handleInputChange} value={this.state.catagory} required>
                                                <option selected>Select category</option>
                                                <option value="Special" required>Special</option>
                                                <option value="Normal" required>Normal</option>
                                                <option value="Other" required>Other</option>
                                            </select>
                                            {formErrors.catagory.length > 1 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.catagory}</p>
                                            )}
                                        </div>
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="age">From : </label>
                                            <input type="text" className="form-control" name="from" value={this.state.from} onChange={this.handleInputChange} required />
                                            {formErrors.from.length > 5 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.from}</p>
                                            )}
                                        </div>
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="age">To Whom : </label>
                                            <input type="text" className="form-control" name="toWhome" value={this.state.toWhome} onChange={this.handleInputChange} required />
                                            {formErrors.toWhome.length > 5 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.toWhome}</p>
                                            )}
                                        </div>
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="age">message : </label>
                                            <textarea className='form-control' name='message' value={this.state.message} onChange={this.handleInputChange} required />
                                            {formErrors.message.length < 10 || formErrors.message.length > 10 && (
                                                <p style={{ color: 'red' }} className="errorMessage">{formErrors.message}</p>
                                            )}
                                        </div>

                                        <div className="row">
                                            <div className="col-4" />
                                            <div className="col-4">
                                                <button type='submit' className='btn btn-primary sub_btn'>Submit</button>
                                            </div>
                                            <div className="col-4" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-1"/>
                        </div>
                    </div>
                    <div className='col-1' />
                </div>
            </div>
        )
    }
}
