<<<<<<< HEAD
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// import Cookies from 'js-cookie';
// import './login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();


//   const handleLogin = (e) => {
//     e.preventDefault();

//     const cleanEmail = email.trim().toLowerCase();
//     if (!cleanEmail || !password) {
//       alert('Email & password required');
//       return;
//     }

//     // Har baar fresh data localStorage se
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const foundUser = users.find(
//       (item) => item.email?.toLowerCase() === cleanEmail && item.password === password
//     );
//     console.log(foundUser)

//     if (!foundUser) {
//       alert('invalid email or password');
//       return;
//     }
// //make an object for storing cookie 
// let obj = {
//     name : foundUser.name,
//     email: foundUser.email,
//     role : foundUser.role
// }
// console.log(obj)
//     alert('you have logged in successfully');

//     // // maxAge 60 sec testing ke liye hai. Real use mein 60 * 60 * 24 (1 din) rakho.
//     // setCookie(
//     //   'myApp_login',
//     //   { name: foundUser.name, email: foundUser.email, role: foundUser.role },
//     //   { path: '/', maxAge: 60 * 30}
//     // );
//     Cookies.set('myApp_login', JSON.stringify(obj), { expires: 7, path: '/' });

//     navigate(foundUser.role === 'admin' ? '/adminDashboard' : '/userDashboard');
//   };

//   return (
//     <div className="signup-page">
//       <form className="signup-card" onSubmit={handleLogin}>
//         <h1>Login Now</h1>

//         <label className="field">
//           Email
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="email"
//           />
//         </label>

//         <label className="field">
//           Password
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//           />
//         </label>

//         <button type="submit" className="signup-btn">
//           Login
//         </button>

//         <p className="auth-switch">
//           New here? <Link to="/">Create an account</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../../context/authContext/authContext';
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD

  const navigate = useNavigate();

  // AuthContext se login function
  const { login } = useAuth();
=======
  const navigate = useNavigate();

>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
<<<<<<< HEAD

=======
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
    if (!cleanEmail || !password) {
      alert('Email & password required');
      return;
    }

<<<<<<< HEAD
    // localStorage se users get karo
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // User find karo
    const foundUser = users.find(
      (item) =>
        item.email?.toLowerCase() === cleanEmail &&
        item.password === password
    );

    console.log('Found User:', foundUser);

    if (!foundUser) {
      alert('Invalid email or password');
      return;
    }

    // User ka required data
    const userData = {
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    };

    console.log('User Data:', userData);

    // AuthContext mein user save karo
    login(userData);

    // Cookie mein user save karo
    Cookies.set(
      'myApp_login',
      JSON.stringify(userData),
      {
        expires: 7,
        path: '/'
      }
    );

    alert('You have logged in successfully');

    // Role ke according dashboard
    navigate(
      foundUser.role === 'admin'
        ? '/adminDashboard'
        : '/userDashboard'
    );
=======
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
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleLogin}>
<<<<<<< HEAD

=======
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
        <h1>Login Now</h1>

        <label className="field">
          Email
<<<<<<< HEAD

=======
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
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
<<<<<<< HEAD

=======
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
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
<<<<<<< HEAD

=======
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default Login;

=======
export default Login;
>>>>>>> 3636894ff8b7a544a0ecf944601945839865ab77
