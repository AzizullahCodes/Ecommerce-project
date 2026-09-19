import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Signup from '../../pages/signup/signup';
import Login from '../../pages/login/login';

const AppRoutes = () => {
  return (
    <div>
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element = {<Login/>}/>
   </Routes>
    </div>
  )
}

export default AppRoutes