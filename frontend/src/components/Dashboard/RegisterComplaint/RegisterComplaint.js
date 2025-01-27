import React, { useState, useEffect } from 'react';
import axios from 'axios';
import constants from '../../../constants';
import './registercomplaint.css';

export default function RegisterComplaint() {
  const [vehicles, setVehicles] = useState([]); 
  const [components, setComponents] = useState([]); 
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userId'),
    vehicleId: '',
    componentId: '',
    description: '',
    quantity: 0,  
    price: 0,
    payment: false,
    resolve: false,
  });

  // Fetch vehicles data
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(constants.API_ROUTES.VEHICLE.GET_VEHICLES);
        setVehicles(response.data.data);
      } catch (error) {
        console.error("Error fetching vehicles data", error);
      }
    };
    fetchVehicles();
  }, []);

  // Fetch components data based on selected vehicle
  useEffect(() => {
    if (formData.vehicleId) {
      const fetchComponents = async () => {
        try {
          const response = await axios.get(constants.API_ROUTES.COMPONENT.GET_COMPONENTS, {
            params: {
                vehicleId: formData.vehicleId
            }
          });
          setComponents(response.data.data);
        } catch (error) {
          console.error("Error fetching components data", error);
        }
      };
      fetchComponents();
    }
  }, [formData.vehicleId]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle changes for quantity and componentId
    if (name === "quantity") {
      const newPrice = formData.componentId ? formData.componentPrice * value : 0;
      setFormData((prevState) => ({
        ...prevState,
        quantity: value,
        price: newPrice,
      }));
    } else if (name === "componentId") {
      const selectedComponent = components.find(comp => comp.id === parseInt(value));
      const newPrice = selectedComponent ? selectedComponent.price * formData.quantity : 0; 
      setFormData({
        ...formData,
        componentId: value,
        componentPrice: selectedComponent ? selectedComponent.price : 0,
        price: newPrice
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(constants.API_ROUTES.USER.REGISTER_COMPLAINT, formData, {
        headers: { Authorization: token },
      });
      console.log("Complaint Registered Successfully:", response.data);
    } catch (error) {
      console.error("Error registering complaint", error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register a New Complaint</h1>
      <form onSubmit={handleSubmit}>
        <div className="complaint-register-form">
          <label htmlFor="vehicleId">Select Vehicle:</label>
          <select
            name="vehicleId"
            id="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </div>
  
        <div className="complaint-register-form">
          <label htmlFor="componentId">Select Component:</label>
          <select
            name="componentId"
            id="componentId"
            value={formData.componentId}
            onChange={handleChange}
            required
            disabled={!formData.vehicleId} // Disable component dropdown if no vehicle is selected
          >
            <option value="">Select a Component</option>
            {components.map((component) => (
              <option key={component.id} value={component.id}>
                {component.name}
              </option>
            ))}
          </select>
        </div>
  
        <div className="complaint-register-form">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="complaint-register-form">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <button type="submit" className="submit-button">
          Register Complaint
        </button>
      </form>
    </div>
  );
}
