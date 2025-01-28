import React, { useState } from 'react';
import './vehicle.css';
import axios from 'axios';
import constants from '../../../constants';

export default function Vehicles({ value, onRefresh }) {
    const [isEditing, setIsEditing] = useState(false);
    const [vehicleData, setVehicleData] = useState({
        name: value.name,
        vehicleType: value.vehicleType,
    });

    const handleDeleteVehicle = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(constants.API_ROUTES.VEHICLE.DELETE_VEHICLE, {
                data: { vehicleId: value.id },
                headers: { Authorization: token },
            });
            alert('Vehicle Deleted Successfully');
            window.location = "/";
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            alert('Failed to delete the vehicle. Please try again.');
        }
    };

    const handleEditVehicle = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(constants.API_ROUTES.VEHICLE.EDIT_VEHICLES,
                {
                    vehicleId: value.id,
                    name: vehicleData.name,
                    vehicleType: vehicleData.vehicleType,
                },
                { headers: { Authorization: token } }
            );
            console.log(response);
            alert('Vehicle Updated Successfully');
            setIsEditing(false);
            window.location = "/"
        } catch (error) {
            console.error('Error updating vehicle:', error);
            alert('Failed to update the vehicle. Please try again.');
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className='vehicle-container'>
            {isEditing ? (
                <div className="vehicle-edit-form">
                    <div className='edit-form'>
                        <input
                            type="text"
                            name="name"
                            value={vehicleData.name}
                            onChange={handleInputChange}
                            placeholder="Vehicle Name"
                        />
                        <input
                            type="number"
                            name="vehicleType"
                            value={vehicleData.vehicleType}
                            onChange={handleInputChange}
                            placeholder="Vehicle Type (e.g., 2, 4)"
                        />
                    </div>
                    <div className='edit-buttons'>
                        <button onClick={handleEditVehicle} className="save-button">Save</button>
                        <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className='vehicle-details'>
                    <div className="vehicle-card">
                        <h3>Vehicle ID: {value.id}</h3>
                        <p>Name: {value.name}</p>
                        <p>Vehicle Type: {value.vehicleType} Wheeler</p>
                    </div>
                    <div className='vehicle-actions'>
                        <button className='edit-vehicle-button' onClick={() => setIsEditing(true)}>Edit</button>
                        <button className='delete-vehicle-button' onClick={handleDeleteVehicle}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}
