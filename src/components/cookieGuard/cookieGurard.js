// CookieGuard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CookieGuard = ({ cookieName = 'myApp_login', children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => {
      if (!cookies.get(cookieName)) {
        // Context use kar rahe ho to yahan setUser(null) bhi karo
        navigate('/login', { replace: true });
      }
    };

    check(); // mount par turant check
    const id = setInterval(check, 1000); // har second check
    window.addEventListener('focus', check); // tab wapas khulne par check

    return () => {
      clearInterval(id);
      window.removeEventListener('focus', check);
    };
  }, [navigate, cookieName]);

  return children;
};

export default CookieGuard;