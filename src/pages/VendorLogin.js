import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockVendors } from '../utils/mockData';
import './VendorLogin.css';

const VendorLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    verificationCode: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock phone verification - in real app, this would send SMS
    if (formData.phone) {
      setCodeSent(true);
      alert(`Verification code sent to ${formData.phone}. Use code: 123456`);
    } else {
      setError('Please enter a valid phone number');
    }
    
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loginMethod === 'email') {
      // Email login
      const vendor = mockVendors.find(v => v.email === formData.email);
      
      if (vendor && formData.password === 'password123') {
        const user = {
          id: vendor.id,
          email: vendor.email,
          name: vendor.name,
          role: 'vendor'
        };
        
        onLogin(user);
        navigate('/vendor-dashboard');
      } else {
        setError('Invalid email or password. Use any vendor email with password "password123"');
      }
    } else {
      // Phone login
      if (formData.verificationCode === '123456') {
        // Mock vendor for phone login
        const user = {
          id: 999,
          email: 'phone@vendor.com',
          name: 'Phone Vendor',
          role: 'vendor'
        };
        
        onLogin(user);
        navigate('/vendor-dashboard');
      } else {
        setError('Invalid verification code. Use: 123456');
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Vendor Login</h1>
          <p>Access your vendor dashboard to manage inventory and orders</p>
        </div>

        <div className="login-method-tabs">
          <button 
            type="button"
            className={`method-tab ${loginMethod === 'email' ? 'active' : ''}`}
            onClick={() => {
              setLoginMethod('email');
              setCodeSent(false);
              setError('');
            }}
          >
            Email Login
          </button>
          <button 
            type="button"
            className={`method-tab ${loginMethod === 'phone' ? 'active' : ''}`}
            onClick={() => {
              setLoginMethod('phone');
              setCodeSent(false);
              setError('');
            }}
          >
            Phone Login
          </button>
        </div>

        {loginMethod === 'email' ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <div className="phone-login-form">
            {!codeSent ? (
              <form onSubmit={handleSendCode} className="login-form">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Verification Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="verificationCode">Verification Code:</label>
                  <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                  />
                  <small>Code sent to {formData.phone}</small>
                </div>

                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </button>

                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => {
                    setCodeSent(false);
                    setError('');
                  }}
                >
                  Back to Phone Number
                </button>
              </form>
            )}
          </div>
        )}

        <div className="demo-info">
          <h3>Demo Credentials:</h3>
          <div className="demo-accounts">
            {mockVendors.map(vendor => (
              <div key={vendor.id} className="demo-account">
                <strong>{vendor.name}</strong><br />
                Email: {vendor.email}<br />
                Password: password123
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
