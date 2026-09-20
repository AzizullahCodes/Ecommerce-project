import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Dashboard.css';

// Shared shell for admin + user dashboards.
// Mobile sidebar open/close CSS-only hai (checkbox + label), koi state/JS nahi.
const DashboardLayout = ({
  brand = 'MyShop',
  title = 'Dashboard',
  links = [],
  user = { name: 'Your Name', role: 'User' },
  children,
}) => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['myApp_login']);

  // Login ke waqt cookie mein jo naam save hua wahi dikhao
  const displayName = cookies.myApp_login?.name || user.name;

  const handleLogout = () => {
    removeCookie('myApp_login', { path: '/' });
    navigate('/login', { replace: true });
  };

  return (
    <div className="dash">
      <input
        id="dash-nav"
        type="checkbox"
        className="dash-nav-toggle"
        aria-label="Toggle navigation"
      />
      <label htmlFor="dash-nav" className="dash-scrim" aria-hidden="true" />

      <aside className="dash-sidebar">
        <div className="dash-brand">{brand}</div>

        <nav className="dash-nav" aria-label="Dashboard">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className="dash-link">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="dash-sidebar-foot">
          <button type="button" className="dash-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <label htmlFor="dash-nav" className="dash-burger" aria-label="Open menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </label>

          <h1 className="dash-title">{title}</h1>

          <div className="dash-search">
            <input type="search" placeholder="Search" aria-label="Search" />
          </div>

          <div className="dash-user">
            <span className="dash-avatar">{displayName.charAt(0).toUpperCase()}</span>
            <span className="dash-user-meta">
              <span className="dash-user-name">{displayName}</span>
              <span className="dash-user-role">{user.role}</span>
            </span>
          </div>
        </header>

        <main className="dash-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;