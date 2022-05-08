import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles.css'
import { useParams } from 'react-router-dom';

const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};

function EditAnnouncement() {
    // const [AssetId, setAssetId] = useState("");
    const [announcementID, setannouncementID] = useState("");
    const [catagory, setcatagory] = useState("");
    const [toWhome, settoWhome] = useState("");
    const [from, setfrom] = useState('');
    const [message, setmessage] = useState('');
    const formError = [{
        announcementID: "",
        catagory: "",
        toWhome: "",
        from: "",
        message: ""
    }]
    const id = useParams()

    useEffect(() => {

        axios.get(`http://localhost:8090/announcement/getannouncementById/${id.id}`)
            .then(response => {
                console.log('Announcement', response.data.announcement)
                
                setannouncementID(response.data.announcement.announcementID)
                setcatagory(response.data.announcement.catagory)
                settoWhome(response.data.announcement.toWhome)
                setfrom(response.data.announcement.from)
                setmessage(response.data.announcement.message)
                            
            
            })       
    }, [])

    function handleInputChange (e){
        const { name, value } = e.target;
        let formErrors = formError;
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
    }

    function onSubmit(e) {
        try {
            e.preventDefault();        
            if (!formValid(formError)) {
                console.error("FORM INVALID-DISPLAY ERROR");
            }

           
            const data = {
                announcementID: announcementID,
                catagory: catagory,
                toWhome: toWhome,
                from: from,
                message: message,
                date: new Date(),
            }
            
            axios.put(`http://localhost:8090/announcement/updateAnnouncement/${id.id}`, data).then((res) => {
                if (res.data.success) {
                    console.log(data);
                    toast.success("Announcement updated");
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


    }      
    return (
        
            <div className="container containerTop">
                <div className="row">
                    <h1 className="top"></h1>
                </div>
                <div className="row">
                    
                    <div className="col-8 position-relative">
                        <h2>Edit Announcement</h2>
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
                                    <form onSubmit={onSubmit}>
                                        
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="age">Category : </label>
                                            <select className="form-control" name="catagory" onChange={(e) => { setcatagory(e.target.value); }} value={catagory} required>
                                                <option selected>Select category</option>
                                                <option value="Special" required>Special</option>
                                                <option value="Normal" required>Normal</option>
                                                <option value="Other" required>Other</option>
                                            </select>
                                            
                                        </div>
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="age">From : </label>
                                            <input type="text" className="form-control" name="from" value={from} onChange={(e) => { setfrom(e.target.value); }} required />
                                            
                                        </div>
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="age">To Whom : </label>
                                            <input type="text" className="form-control" name="toWhome" value={toWhome} onChange={(e) => { settoWhome(e.target.value); }} required />
                                            
                                        </div>
                                        <div className="form-group" style={{ marginTop: '15px' }}>
                                            <label for="age">message : </label>
                                            <textarea className='form-control' name='message' value={message} onChange={(e) => { setmessage(e.target.value); }} required />
                                            
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

export default EditAnnouncement;