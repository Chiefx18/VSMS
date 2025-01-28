import React ,  { useState, useEffect }from 'react'
import './customer.css';
import constants from '../../../constants';
import axios from 'axios';
import profileImage from '../../../images/profile.jpg';
import Complaint from '../Complaint/Complaint';
import RegisterComplaint from '../RegisterComplaint/RegisterComplaint';


export default function Customer() {
    const [profile, setProfile] = useState(null);
    const [complaints,setComplaints] = useState(null);
    const [page, setPage] = useState('complaints');
    const userType = localStorage.getItem('userType');
    // Load Profile
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(constants.API_ROUTES.USER.GET_PROFILE, {
              headers: { Authorization:token },
            });
            setProfile(response.data.data);
          } catch (error) {
            console.error("Error fetching user profile", error);
          }
        };
    
        fetchData();
      }, []);
    // Load all complaints
    useEffect(() => {
    const fetchComplaints = async () => {
        try {
        const token = localStorage.getItem("token");
        const response = await axios.get(constants.API_ROUTES.USER.ALL_USER_COMPLAINTS ,{
            headers: { Authorization: token },
        });
        setComplaints(response.data.data);
        } catch (error) {
        console.error("Error fetching complaints", error);
        }
    };

    fetchComplaints();
    }, []);


    const handleLogout = async () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        window.location = "/"
    }

    const changePage = (pageType) => {
        setPage(pageType);
      };

    return (
        <div className="customer-container">
            <div className="navbar">
                <h1>FYN</h1>
                <div className="customer-routes">
                    <button className='nav-button' onClick={() => changePage('complaints')}>
                        Complaints
                    </button>
                    <button className='nav-button' onClick={() => changePage('register')}>
                        Register Complaint
                    </button>
                    <button className='logout-button' onClick={handleLogout}>
                        Logout 
                    </button>
                </div>
            </div>
            <div className="main-container">
                <div className="user-profile-left">
                    { profile && 
                    <div className="profile-container">
                        <div className="display-image">
                            <img src={profileImage} alt={profileImage} />
                        </div>
                        <div className="user-details">
                            <h1>{profile.name}</h1>
                            <h3>{profile.email}</h3>
                        </div>
                    </div>
                    }
                </div>
                <div className="user-profile-right">
                    {complaints && page === 'complaints' && 
                        complaints.map((complaint)=>(
                            <Complaint key={complaint.id} value ={complaint}/>
                        ))
                    }
                    {  page === 'register' && 
                        <RegisterComplaint/>

                    }
                </div>
            </div>

        </div>
    )
}
