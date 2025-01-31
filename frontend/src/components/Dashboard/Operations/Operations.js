import React, { useState, useEffect } from 'react';
import './operations.css';
import constants from '../../../constants';
import axios from 'axios';
import profileImage from '../../../images/profile.jpg';
import OperationsComplaint from '../OperationComplaints/OperationsComplaints';
import Vehicles from '../vehicles/vehicles';
import VehicleComponents from '../VehicleComponents/VehicleComponents';
import Revenue from '../Revenue/Revenue';

export default function Operations() {
  const [profile, setProfile] = useState(null);
  const [complaints, setComplaints] = useState(null);
  const [allVehicles, setAllVehicles] = useState(null);
  const [allVehicleComponents, setAllVehicleComponents] = useState(null);
  const [page, setPage] = useState('complaints');
  const [newVehicleModal, setNewVehicleModal] = useState(false);
  const [newComponentModal, setNewComponentModal] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    name: '',
    vehicleType: '',
  });
  const [componentData, setComponentData] = useState({
    name: '',
    price: 0,
    vehicleId:0,
    quantity:0
  });
  const userType = localStorage.getItem('userType');

  // Load Profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(constants.API_ROUTES.USER.GET_PROFILE, {
          headers: { Authorization: token },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchData();
  }, []);

  // Load all complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(constants.API_ROUTES.USER.GET_ALL_COMPLAINTS, {
          headers: { Authorization: token },
        });
        setComplaints(response.data.data);
      } catch (error) {
        console.error('Error fetching complaints', error);
      }
    };

    fetchComplaints();
  }, []);

  // Load all vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(constants.API_ROUTES.VEHICLE.GET_VEHICLES, {
          headers: { Authorization: token },
        });
        setAllVehicles(response.data.data);
      } catch (error) {
        console.error('Error fetching vehicles', error);
      }
    };

    fetchVehicles();
  }, []);

  // Load all components
  useEffect(() => {
    const fetchVehicleComponents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(constants.API_ROUTES.COMPONENT.GET_ALL_COMPONENTS, {
          headers: { Authorization: token },
        });
        setAllVehicleComponents(response.data.data);
      } catch (error) {
        console.error('Error fetching components', error);
      }
    };

    fetchVehicleComponents();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.location = '/';
  };

  const changePage = (pageType) => {
    setPage(pageType);
  };

  // Handle Add Vehicle Form
  const handleAddVehicle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(constants.API_ROUTES.VEHICLE.ADD_VEHICLES, vehicleData, {
        headers: { Authorization: token },
      });
      setAllVehicles((prev) => [...prev, response.data.data]); 
      setNewVehicleModal(false);
      setVehicleData({ name: '', vehicleType: '' }); 
      window.location ="/"
    } catch (error) {
        console.error('Error adding vehicle', error);
    }
};

// Handle Add Component Form
const handleAddComponent = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(constants.API_ROUTES.COMPONENT.ADD_COMPONENTS, componentData, {
            headers: { Authorization: token },
        });
        setAllVehicleComponents((prev) => [...prev, response.data.data]); 
        setNewComponentModal(false); 
        setComponentData({ name: '', price: '' });
        window.location ="/"
    } catch (error) {
      console.error('Error adding component', error);
    }
  };

  return (
    <div className="customer-container">
      <div className="navbar">
        <h1>FYN</h1>
        <div className="customer-routes">
          <button className="nav-button" onClick={() => changePage('revenue')}>
            Revenue
          </button>
          <button className="nav-button" onClick={() => changePage('vehicles')}>
            Vehicles
          </button>
          <button className="nav-button" onClick={() => changePage('components')}>
            Components
          </button>
          <button className="nav-button" onClick={() => changePage('complaints')}>
            Complaints
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="main-container">
        <div className="user-profile-left">
          {profile && (
            <div className="profile-container">
              <div className="display-image">
                <img src={profileImage} alt={profileImage} />
              </div>
              <div className="user-details">
                <h1>{profile.name}</h1>
                <h3>{profile.email}</h3>
              </div>
            </div>
          )}
        </div>
        <div className="user-profile-right">
          {page === 'complaints' && complaints && complaints.map((complaint) => <OperationsComplaint key={complaint.id} value={complaint} />)}

          {page === 'vehicles' && (
            <div className='add-vehicle-container'>
              {!newVehicleModal && (
                <button className="add-new-button" onClick={() => setNewVehicleModal(true)} >
                  Add New Vehicle
                </button>
              )}
              {newVehicleModal && (
                <div className="modal">
                  <h1>Add New Vehicle</h1>
                  <input
                    type="text"
                    placeholder="Vehicle Name"
                    value={vehicleData.name}
                    onChange={(e) => setVehicleData({ ...vehicleData, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Vehicle Type"
                    value={vehicleData.vehicleType}
                    onChange={(e) => setVehicleData({ ...vehicleData, vehicleType: e.target.value })}
                  />
                  <button onClick={handleAddVehicle} className='add-button'>Add Vehicle</button>
                  <button onClick={() => setNewVehicleModal(false)} className='cancel-button'>Cancel</button>
                </div>
              )}
              {!newVehicleModal && allVehicles.map((vehicle) => <Vehicles key={vehicle.id} value={vehicle} />)}
            </div>
          )}

          {page === 'components' && (
            <div className='add-component-container'>
              {!newComponentModal && (
                <button className="add-new-button" onClick={() => setNewComponentModal(true)}>
                  Add New Component
                </button>
              )}
              {newComponentModal && (
                <div className="modal">
                  <h1>Add New Component</h1>
                  <input
                    type="text"
                    placeholder="Component Name"
                    value={componentData.name}
                    onChange={(e) => setComponentData({ ...componentData, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={componentData.price}
                    onChange={(e) => setComponentData({ ...componentData, price: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={componentData.quantity}
                    onChange={(e) => setComponentData({ ...componentData, quantity: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Vehicle Id"
                    value={componentData.vehicleId}
                    onChange={(e) => setComponentData({ ...componentData, vehicleId: e.target.value })}
                  />
                  <button onClick={handleAddComponent} className='add-button'>Add Component</button>
                  <button onClick={() => setNewComponentModal(false)} className='cancel-button'>Cancel</button>
                </div>
              )}
              {!newComponentModal && allVehicleComponents.map((component) => <VehicleComponents key={component.id} value={component} />)}
            </div>
          )}

          {page === 'revenue' && <Revenue />}
        </div>
      </div>
    </div>
  );
}
