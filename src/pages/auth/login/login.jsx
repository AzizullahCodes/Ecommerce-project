
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../../context/authContext/authContext';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      alert('Email & password required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(
      (item) =>
        item.email?.toLowerCase() === cleanEmail &&
        item.password === password
    );

    if (!foundUser) {
      alert('Invalid email or password');
      return;
    }

    const userData = {
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    // Save in Context
    login(userData);

    // Save in Cookie
    Cookies.set(
      'myApp_login',
      JSON.stringify(userData),
      {
        expires: 7,
        path: '/',
      }
    );

    alert('You have logged in successfully');

    navigate(
      foundUser.role === 'admin'
        ? '/adminDashboard'
        : '/userDashboard'
    );
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

