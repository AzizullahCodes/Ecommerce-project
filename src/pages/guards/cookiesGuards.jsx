// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Cookies } from 'react-cookie';

// const cookies = new Cookies();

// // Cookie ka naam wahi hona chahiye jo login.jsx mein setCookie mein hai
// const COOKIE_NAME = 'myApp_login';

// // Use: <CookieGuard role="admin"> ... </CookieGuard>
// const CookieGuard = ({ role, children }) => {
//   const navigate = useNavigate();

//   // Shuru mein false: jab tak check na ho, page nahi dikhega
//   const [allowed, setAllowed] = useState(false);

//   useEffect(() => {
//     const checkLogin = () => {
//       // Cookie se logged-in user nikalo (login ke waqt {name, email, role} save hua tha)
//       const user = cookies.get(COOKIE_NAME);

//       if (user && user.role === role) {
//         // Cookie hai aur role match karta hai -> page dikhao
//         setAllowed(true);
//       } else {
//         // Cookie nahi hai (logout / expire) ya role galat hai -> login page bhejo
//         setAllowed(false);
//         navigate('/login', { replace: true }); // replace: back button se wapas nahi aayega
//       }
//     };

//     checkLogin(); // page khulte hi ek baar check

//     // Har 1 second baad dobara check, taake cookie expire hote hi user login pe chala jaye
//     const timerId = setInterval(checkLogin, 1000);

//     // Page band hone par timer band kar do
//     return () => clearInterval(timerId);
//   }, [navigate, role]);

//   // allowed true ho tabhi andar ka page (children) dikhao
//   return allowed ? children : null;
// };

// export default CookieGuard;