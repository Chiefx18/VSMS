import React from 'react'
import './OperationsComplaints.css';
import axios from 'axios';
import constants from '../../../constants';

export default function OperationsComplaint({ value }) {

    const handleResolveComplaint = async () => {
        const token = localStorage.getItem('token');
        const complaintId = value.id;
        const response = await axios.post(constants.API_ROUTES.OPERATIONS.RESOLVE_COMPLAINT, { complaintId }, {
            headers: { Authorization: token },
        });
        alert("Complaint Resolved Successful");
        window.location = "/";
    }


    return (
        <div className='complaint-container'>
            <div className="complaint-card">
                <h3>Complaint ID: {value.id}</h3>
                <p>Description: {value.description}</p>
                <p>Price: ₹{value.price}</p>
                <p>Quantity: {value.quantity}</p>
                <p>Status: {value.resolve ? "Resolved" : "Unresolved"}</p>
                <p>Payment: {value.payment ? "Paid" : "Pending"}</p>
            </div>
            <div className='resolve-complaints'>
                {!value.resolve &&
                    <button className='complaint-resolve-button' onClick={handleResolveComplaint}>Mark as Resolved</button>
                } 
                {
                    value.resolve && 
                    <button className='complaint-resolved-button'>Complaint Resolved</button>
                }
            </div>
        </div>
    )
}
