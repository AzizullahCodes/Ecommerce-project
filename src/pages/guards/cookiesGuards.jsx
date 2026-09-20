// Cookie expiry + role check. Cookie na ho ya role match na kare to /login pe redirect.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const hasAccess = (cookieName, role) => {
  const session = cookies.get(cookieName);
  return Boolean(session) && (!role || session.role === role);
};

// Use: <CookieGuard role="admin"> ... </CookieGuard>
const CookieGuard = ({ cookieName = 'myApp_login', role, children }) => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(() => hasAccess(cookieName, role));

  useEffect(() => {
    const check = () => {
      const ok = hasAccess(cookieName, role);
      setAllowed(ok);
      if (!ok) navigate('/login', { replace: true });
    };

    check(); // mount par turant check
    const id = setInterval(check, 1000); // har second check (expiry ke liye)
    window.addEventListener('focus', check); // tab wapas khulne par check

    return () => {
      clearInterval(id);
      window.removeEventListener('focus', check);
    };
  }, [navigate, cookieName, role]);

  // Access na ho to protected content render hi nahi hota (flash nahi)
  return allowed ? children : null;
};

export default CookieGuard;