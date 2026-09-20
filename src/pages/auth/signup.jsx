import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password || !role) {
      alert('plz fill all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const alreadyExists = users.some((item) => item.email?.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      alert('user with this email already exists');
      return;
    }

    users.push({ name: cleanName, email: cleanEmail, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    alert('account created, now login');
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSignup}>
        <h1>Register Yourself First</h1>

        <label className="field">
          Name
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </label>

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
            autoComplete="new-password"
          />
        </label>

        <label className="field">
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button type="submit" className="signup-btn">
          Register
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;