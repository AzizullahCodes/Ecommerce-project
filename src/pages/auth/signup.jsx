import React, { useEffect } from 'react'
import { useState } from 'react';
import './Signup.css'


const Signup = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('user')
    const [data,setData] = useState([]);
    

   

    //handleSignup function
    const handleSignup = ()=>{
        console.log(name,email,password,role)
        if(!name || !email ||!password || !role){
            alert('plz fill all fields')
            return
        }
        let isExit = data.some((item)=>{
            return item.email == email
        })
        if(isExit){
            alert('user with this email alread exist')
            return
        }

       
            let obj = {
                name,
                email,
                password,
                role
            }
            let  getUsers = JSON.parse(localStorage.getItem('users'))
           
                 let cloneGetUsers = [...getUsers]
            cloneGetUsers.push(obj)
            localStorage.setItem('users',JSON.stringify(cloneGetUsers))
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
        <h1>Register Yourself First</h1>

        <label className="field">
          Name
          <input type="text"
           placeholder="Enter your name"
           value={name}
           onChange={(e)=>setName(e.target.value)}
           autoComplete='new-name' />
        </label>

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

        <label className="field">
          Role
          <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button type="button" className="signup-btn" onClick={handleSignup}>Register</button>
      </div>
    </div>
  )
}

export default Signup