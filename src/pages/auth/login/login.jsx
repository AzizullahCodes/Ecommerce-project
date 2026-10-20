import { useDispatch, useSelector } from 'react-redux';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setUser } from '../../../store/slices/auth/authSlice.js';
import { showError, showSuccess } from '../../../utils/sweetAlert.js';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      await showError('Missing details', 'Email & password are required');
      return;
    }

    const foundUser = users.find(
      (item) =>
        item.email?.toLowerCase() === cleanEmail &&
        item.password === password
    );

    if (!foundUser) {
      await showError('Login failed', 'Invalid email or password');
      return;
    }

    const userData = {
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    // Save in Redux (store persists to localStorage)
    dispatch(setUser(userData));

    // Save in Cookie
    Cookies.set(
      'myApp_login',
      JSON.stringify(userData),
      {
        expires: 7,
        path: '/',
      }
    );

    await showSuccess('Logged in', 'You have logged in successfully');

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


