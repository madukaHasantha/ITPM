import React, { Component, useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function AllAnnouncement() {

    const [announcement, setannouncement] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:8090/announcement/getAllAnnouncement`)
            .then((res) => {
                if (res.data.success) {
                        setannouncement( res.data.existingAnnouncement)
                    console.log(announcement);
                }
            });
    }, [])


    return (
        <div className="container">
            <br></br><br></br>
            <h1>All Announcements</h1>
            <hr></hr>
            {announcement.length > 0 && announcement.map((item, index) => (
                <div key={index} className="card mb-3"
                style={{
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    color: 'black',
                    backgroundColor: 'grey',
                    borderRadius: 8,
                    margin: '15px',
                    padding: '3px 10px',
                    display: 'block',
                    backgroundColor:
                    ((index %2 === 0  && 'grey') ||
                        (index %2 === 1 && 'red')),
                    
                    }}>
                    <div className="row">
                        <div className="col">
                        <h6>{item.catagory} Notice</h6>
                        </div>  
                        <div className="col" align='right'>
                        <h6>{item.date}</h6>
                        </div>
                    </div>    
                        <h6>From : {item.from}</h6>
                        <h6>To : {item.toWhome}</h6>
                        <center><h6> {item.message}</h6></center> 
                </div>
            ))}
<hr></hr>   </div>
    
    )

}

export default AllAnnouncement;