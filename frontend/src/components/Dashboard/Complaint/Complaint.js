import React from 'react'
import './complaint.css';
import axios from 'axios';
import constants from '../../../constants';

export default function Complaint({value}) {

  const handlePayment = async () =>{
    const token = localStorage.getItem('token'); 
    const complaintId = value.id;
    const response = await axios.post(constants.API_ROUTES.USER.PAY, {complaintId}, {
      headers: { Authorization:token },
    });
    alert("Payment Successful");
    window.location ="/";
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
        <div className='payment-gateways'>
        {value.resolve && !value.payment && (
          <button className='payment-pending' onClick={handlePayment}> Pay Now</button>
        )}
        {value.payment && (
          <button className='payment-successful'>Payment Completed</button>
        )}
        {!value.resolve && !value.payment && (
          <button className='complaint-pending'>Proccesing Complaint</button>
        )}
        </div>
    </div>
  )
}
