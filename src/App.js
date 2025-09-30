import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import VendorLogin from './pages/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';
import BuyerLogin from './pages/BuyerLogin';
import BuyerDashboard from './pages/BuyerDashboard';
import OrderModal from './components/OrderModal';

// Styles
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handlePlaceOrder = (item) => {
    // Check if user is logged in as a buyer
    if (!user || user.role !== 'buyer') {
      alert('Please log in as a buyer to place an order.');
      return;
    }
    setSelectedItem(item);
    setShowOrderModal(true);
  };

  const handleConfirmOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      buyerId: user.id, // Use the logged-in buyer's ID
      buyerName: user.companyName,
      status: 'pending',
      acceptedVendorId: null
    };
    
    setOrders(prev => [...prev, newOrder]);
    setShowOrderModal(false);
    setSelectedItem(null);
    
    // Show success message
    alert('Order placed successfully! You will be notified when a vendor accepts your order.');
  };

  // Check for existing user session on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Home onPlaceOrder={handlePlaceOrder} />} 
            />
            <Route 
              path="/vendor-login" 
              element={<VendorLogin onLogin={handleLogin} />} 
            />
            <Route 
              path="/buyer-login" 
              element={<BuyerLogin onLogin={handleLogin} />} 
            />
            <Route 
              path="/vendor-dashboard" 
              element={
                user && user.role === 'vendor' ? 
                  <VendorDashboard user={user} orders={orders} onOrderUpdate={setOrders} /> : 
                  <div>Access denied. Please log in as a vendor.</div>
              } 
            />
            <Route 
              path="/buyer-dashboard" 
              element={
                user && user.role === 'buyer' ? 
                  <BuyerDashboard user={user} orders={orders} /> : 
                  <div>Access denied. Please log in as a buyer.</div>
              } 
            />
          </Routes>
        </main>

        <Footer />

        {/* Order Modal */}
        <OrderModal
          isOpen={showOrderModal}
          onClose={() => {
            setShowOrderModal(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onConfirmOrder={handleConfirmOrder}
        />

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
