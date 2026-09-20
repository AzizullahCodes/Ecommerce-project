import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Signup from '../../pages/signup/signup';
import Login from '../../pages/login/login';
import UserDashboard from '../../pages/userDashboard/userDashboard';
import AdminDashboard from '../../pages/adminDashboard/adminDashboard';

const AppRoutes = () => {
  return (
    <div>
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element = {<Login/>}/>

    <Route path='/userDashboard' element={<UserDashboard/>}/>
    <Route path='/adminDashboard' element={<AdminDashboard/>}/>
  

   </Routes>
    </div>
  )
}

export default AppRoutes