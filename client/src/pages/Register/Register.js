import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

const Register = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("")
    const register = ()=>{
        axios.post('http://localhost:8000/users/register',({
            username: username,
            password: password,
        })).then(
            (response)=>{
                console.log(response);
            }
        )
    }
    return (
        <div className='register'>
        <div className='register-form'>
            <h2 lassName='form-items'>Registration Form</h2>
            <input className='form-items' type='text' placeholder='Username' 
            onChange={(e)=>{setusername(e.target.value)}}/>
            <input className='form-items' type='password' placeholder='Password'
            onChange={(e)=>{setpassword(e.target.value)}} />
            <button className='form-items' type='submit'
            onClick={register}>Register</button>
        </div>
        </div>
    );
}

export default Register;
