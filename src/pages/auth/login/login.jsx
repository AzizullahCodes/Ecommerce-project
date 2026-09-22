import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      alert('Email & password required');
      return;
    }

    // Har baar fresh data localStorage se
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(
      (item) => item.email?.toLowerCase() === cleanEmail && item.password === password
    );
    console.log(foundUser)

    if (!foundUser) {
      alert('invalid email or password');
      return;
    }
//make an object for storing cookie 
let obj = {
    name : foundUser.name,
    email: foundUser.email,
    role : foundUser.role
}
console.log(obj)
    alert('you have logged in successfully');

    // // maxAge 60 sec testing ke liye hai. Real use mein 60 * 60 * 24 (1 din) rakho.
    // setCookie(
    //   'myApp_login',
    //   { name: foundUser.name, email: foundUser.email, role: foundUser.role },
    //   { path: '/', maxAge: 60 * 30}
    // );
    Cookies.set('myApp_login', JSON.stringify(obj), { expires: 7, path: '/' });

    navigate(foundUser.role === 'admin' ? '/adminDashboard' : '/userDashboard');
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleLogin}>
        <h1>Login Now</h1>

        <label className="field">
          Email
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>

        <label className="field">
          Password
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button type="submit" className="signup-btn">
          Login
        </button>

        <p className="auth-switch">
          New here? <Link to="/">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;