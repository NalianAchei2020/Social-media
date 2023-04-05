import React, { useState } from 'react';
import './login.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();
    const login =()=>{
        axios.post('http://localhost:8000/users/login',({
            username: username,
            password: password,
        })).then(
            (response)=>{
                if(response.data.isLogin){
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('username', response.data.username);
                    console.log(response);
                    navigate('/');
                }
                else{
                    
       setErrorMessage(response.data.message);
                }
            }
        )
    }
    return (
        <div className='login'>
        <div className='login-form'>
            <h2 lassName='form-items'>Log-in Form</h2>
            <input className='form-items' type='text' placeholder='Username' 
            onChange={(e)=>{setusername(e.target.value)}}/>
            <input className='form-items' type='password' placeholder='Password'
            onChange={(e)=>{setpassword(e.target.value)}} />
            <button className='form-items' type='submit'
           onClick={login}>Login</button>
           <h1 style={{color:"red"}}>{ErrorMessage}</h1>
        </div>    
        </div>
    );
}

export default Login;
