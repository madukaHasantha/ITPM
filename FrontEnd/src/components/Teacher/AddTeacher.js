import React, { Component } from 'react'
import axios from "axios";
import { ToastContainer, toast, zoom, Bounce } from "react-toastify";


const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddTeacher extends Component {

    constructor(props){
        super(props);
        this.state={
            firstName:"",
            lastName:"",
            email:"",
            mobile: Number,
            dateOfBirth: new Date,
            password: "",
            address: "",
            idNumber: "",
            role: "",
            gender:"",
            className:"",
			formErrors:{
                firstName:"",
                lastName:"",
                email:"",
                mobile:0,
                dateOfBirth: new Date,
                password: "",
                address: "",
                idNumber: "",
                role: "",
                gender:"",
                className:"",
            }        
        }
    }
    
    handleInputChange=(e)=>{
        const{name,value} = e.target;
        let formErrors = this.state.formErrors;
        switch(name){
            case "firstName":
            formErrors.driverNo=
            value.length < 4
            ?"First Name is required, must have minimum 4 characters"
            :"";
            break;
            case "lastName":
                formErrors.name =
                value.length < 5 || value.length > 30
                ?"Last Name is required, must have minimum 5 characters"
                :"";
                break;
                case "email":
                    formErrors.licenceNo =
                    value.length < 8 || value.length > 8 
                    ?"licence must have 8 charactors"
                    :"";
                    break;
                    case "mobile":
                        formErrors.nic=
                        value.length < 10 || value.length > 12
                        ?"NIC must have charactor length 10 or 12"
                        :"";
                        break;
                        case "mobile":
                            formErrors.mobile=
                            value.length > 10 || value.length < 10
                            ?"Mobile Number must have 10 digit"
                            :0;
                            break;
                                default:
                                    break;
        }
        this.setState({formErrors,[name]: value},()=> console.log(this.state));        
        this.setState({
            ...this.state,
            [name]:value
        });
    };
    
    
    onSubmit = (e) =>{
        e.preventDefault();
		if(!formValid(this.state.formErrors)){
			console.error("FORM INVALID-DISPLAY ERROR");
		}        
        const {driverNo,name,licenceNo,nic,mobile,address}=this.state;
        const data ={
            driverNo:driverNo,
            name:name,
            licenceNo:licenceNo,
            nic:nic,
            mobile:mobile,
            address:address
        }

        //console.log(data)
        axios.post("http://localhost:8000/driver/add_driver",data).then((res)=>{
            if(res.data.success){
                toast.success("New Driver Added");
                this.setState(
                    {
                        driverNo:"",
                        name:"",
                        licenceNo:"",
                        nic:"",
                        mobile:Number,
                        address:""
                    }
                )
            }else{
                toast.error("You have an Error in Inserting");
            }
        });
    };
            

  render() {
    const {formErrors}= this.state;
    return (
      <div>AddTeacher</div>
    )
  }
}
