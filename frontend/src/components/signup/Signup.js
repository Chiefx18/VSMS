import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import constants, {USER_TYPES} from '../../constants'
import axios from 'axios';
import './signup.css';

export default function Login() {
  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
    userType:"",
  })
  
  const navigate = useNavigate();

  const handleChange = ({currentTarget:input}) =>{
    setData({...data, [input.name]:input.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const url = constants.API_ROUTES.AUTH.SIGNUP;
    const {data:res} = await axios.post(url,data);
    console.log(res.message);
    navigate("/login")
  }

  return (
    <div className='signup-container'>
      <h1>Sign up</h1>
      <div className="login-redirection">
        <div>Already have an account</div>
        <Link to="/login">
        <button className='redirection-button'>
          Login
        </button>
        </Link>
      </div>
      {/* login form  */}
      <form className='signup-form' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Name'
          name='name'
          required
          value={data.name}
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder='Email'
          name='email'
          required
          value={data.email}
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder='Password'
          name='password'
          required
          value={data.password}
          onChange={handleChange}
        />
        <select
          name="userType"
          required
          value={data.userType}
          onChange={handleChange}
        >
          <option value="" disabled>Select User Type</option>
          {USER_TYPES.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button type='submit' className='signup-button'>
          Sign Up
        </button>
      </form>
    </div>
  )
}
