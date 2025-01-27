import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import constants from '../../constants'
import axios from 'axios';
import './login.css';

export default function Login() {
  const [data,setData] = useState({
    email:"",
    password:"",
  })


  const handleChange = ({currentTarget:input}) =>{
    setData({...data, [input.name]:input.value})
  }

  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const url = constants.API_ROUTES.AUTH.LOGIN;
    const {data:res} = await axios.post(url,data);
    console.log(res.message);
    localStorage.setItem('token', res.token);
    localStorage.setItem('userType', res.userType);
    localStorage.setItem('userId', res.userId);
    window.location="/";
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <div className="signup-redirection">
        <div>New to here</div>
        <Link to="/signup">
        <button  className='redirection-button'>
          Sign Up
        </button>
        </Link>
      </div>
      {/* login form  */}
      <form className='login-form' onSubmit={handleSubmit}>
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
        <button type='submit' className='login-button'>
          Login
        </button>
      </form>
    </div>
  )
}
