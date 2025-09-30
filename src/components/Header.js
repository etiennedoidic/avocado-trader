import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🥑 Avocado Marketplace
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          {user ? (
            <>
              {user.role === 'vendor' ? (
                <Link to="/vendor-dashboard" className="nav-link">Dashboard</Link>
              ) : (
                <Link to="/buyer-dashboard" className="nav-link">My Orders</Link>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/buyer-login" className="nav-link">Buyer Login</Link>
              <Link to="/vendor-login" className="nav-link">Vendor Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
