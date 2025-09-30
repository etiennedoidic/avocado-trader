import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🥑 Avocado Marketplace</h3>
            <p>Connecting buyers and suppliers in the global avocado trade.</p>
          </div>
          
          <div className="footer-section">
            <h4>For Buyers</h4>
            <ul>
              <li>Browse Inventory</li>
              <li>Place Orders</li>
              <li>Track Deliveries</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>For Vendors</h4>
            <ul>
              <li>Manage Inventory</li>
              <li>Accept Orders</li>
              <li>Track Sales</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Avocado Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
