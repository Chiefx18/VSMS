import React, { useState } from 'react';
import './vehiclecomponent.css';
import axios from 'axios';
import constants from '../../../constants';

export default function VehicleComponents({ value }) {
    const [isEditing, setIsEditing] = useState(false);
    const [vehicleComponentData, setVehicleComponentData] = useState({
        id: value.id,
        vehicleId: value.vehicleId,
        name: value.name,
        price : value.price,
        quantity: value.quantity,
        componentId:value.id,
    });

    const handleDeleteComponent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(constants.API_ROUTES.COMPONENT.DELETE_COMPONENTS, {
                data: { componentId: value.id },
                headers: { Authorization: token },
            });
            alert('Component Deleted Successfully');
            window.location = "/";
        } catch (error) {
            console.error('Error deleting Component:', error);
            alert('Failed to delete the Component. Please try again.');
        }
    };

    const handleEditComponent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(constants.API_ROUTES.COMPONENT.EDIT_COMPONENTS,
                {
                    id: vehicleComponentData.id,
                    vehicleId: vehicleComponentData.vehicleId,
                    name: vehicleComponentData.name,
                    price : vehicleComponentData.price,
                    quantity: vehicleComponentData.quantity,
                    componentId:vehicleComponentData.componentId,
                },
                { headers: { Authorization: token } }
            );
            alert('Component Updated Successfully');
            setIsEditing(false);
            window.location = "/"
        } catch (error) {
            console.error('Error updating vehicleComponentData:', error);
            alert('Failed to update the vehicleComponentData. Please try again.');
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicleComponentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className='vehicle-component-container'>
            {isEditing ? (
                <div className="component-edit-form">
                    <div className='edit-form'>
                        <input
                            type="text"
                            name="name"
                            value={vehicleComponentData.name}
                            onChange={handleInputChange}
                            placeholder="Vehicle Name"
                        />
                        <input
                            type="number"
                            name="vehicleId"
                            value={vehicleComponentData.vehicleId}
                            onChange={handleInputChange}
                            placeholder="Vehicle Id (e.g., 2, 4)"
                        />
                        <input
                            type="number"
                            name="price"
                            value={vehicleComponentData.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={vehicleComponentData.quantity}
                            onChange={handleInputChange}
                            placeholder="Quantity"
                        />
                    </div>
                    <div className='edit-buttons'>
                        <button onClick={handleEditComponent} className="save-button">Save</button>
                        <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className='vehicle-component-details'>
                    <div className="component-card">
                        <h3>Component Id : {value.id}</h3>
                        <p>Name : {value.name}</p>
                        <p>Vehicle Id : {value.vehicleId}</p>
                        <p>Price : ₹{value.price}</p>
                        <p>Quantity : {value.quantity}</p>
                    </div>
                    <div className='vehicle-actions'>
                        <button className='edit-component-button' onClick={() => setIsEditing(true)}>Edit</button>
                        <button className='delete-component-button' onClick={handleDeleteComponent}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}
