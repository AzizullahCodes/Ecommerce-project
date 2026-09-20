import React, { useEffect } from 'react'
import { useState } from 'react';
import './Login.css'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [data,setData] = useState([]);
    const navigateTo = useNavigate('')
    //destructing of cookie
     const [cookies, setCookie, removeCookie] = useCookies(['myApp_login']);
    //handleLogin function
    const handleLogin = ()=>{
        console.log(email,password)
        if( !email ||!password ){
            alert('Email & password required')
            return
        }
        let isExit = data.find((item)=>{
            return item.email == email && item.password == password
        })
            console.log(isExit.role)
           if(isExit){
            alert('you have logged in successfully')
             setCookie('myApp_login', {email}, { path: '/', maxAge: 60 });
             if(isExit.role === 'admin'){
              navigateTo('/adminDashboard')

             }
             else{
              navigateTo('/userDashboard')
             }
           }
           else{
            alert('invalid email or password')
           }
            
               }
             
           
            
        
    
    //useEffect 
    useEffect(()=>{
     let getUsersList = JSON.parse(localStorage.getItem('users')) 
     console.log(getUsersList)
     getUsersList && setData(getUsersList)
     if(!getUsersList){
        localStorage.setItem('users', JSON.stringify([]))
     }
     
    },[])

   
    console.log(data)
   
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Login Now</h1>

       

        <label className="field">
          Email
          <input type="email"
           placeholder="Enter your email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           autoComplete='new-email' />
        </label>

        <label className="field">
          Password
          <input type="password"
           placeholder="Enter your password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           autoComplete='new-password' />
        </label>

        

        <button type="button" className="signup-btn" onClick={handleLogin}>Register</button>
      </div>
    </div>
  )
}

export default Login