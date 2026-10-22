import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../../store/slices/users/usersSlice.js';
import { showError, showSuccess } from '../../../utils/sweetAlert.js';
import './signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);

  const handleSignup = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password || !role) {
      await showError('Missing details', 'Please fill all the fields');
      return;
    }

    const alreadyExists = users.some((item) => item.email?.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      await showError('Account exists', 'A user with this email already exists');
      return;
    }

    if (cleanName.length < 2) {
      await showError('Invalid name', 'Name must be at least 2 characters');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      await showError('Invalid email', 'Please enter a valid email address');
      return;
    }

    // Strong Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      await showError(
        'Weak password', 
        'Password must be at least 8 characters long and include an uppercase, a lowercase, a number, and a special character.'
      );
      return;
    }

    dispatch(addUser({ name: cleanName, email: cleanEmail, password, role }));

    await showSuccess('Account created', 'You can now log in with your new account');
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
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
            </button>
          </div>
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
