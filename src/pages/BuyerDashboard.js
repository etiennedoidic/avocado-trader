import React, { useState, useEffect } from 'react';
import { mockOrders } from '../utils/mockData';
import './BuyerDashboard.css';

const BuyerDashboard = ({ user, orders: appOrders = [] }) => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    // Combine mock orders with app orders and filter by current user
    // Use a Map to deduplicate orders by ID
    const orderMap = new Map();
    
    // Add mock orders first
    mockOrders.forEach(order => {
      orderMap.set(order.id, order);
    });
    
    // Add app orders (these will override mock orders with same ID)
    appOrders.forEach(order => {
      orderMap.set(order.id, order);
    });
    
    // Convert back to array and filter by current user
    const userOrders = Array.from(orderMap.values()).filter(order => 
      order.buyerId === user?.id || order.buyerName === user?.companyName
    );
    
    setOrders(userOrders);
  }, [appOrders, user]);

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const acceptedOrders = orders.filter(order => order.status === 'accepted');
  const outForDeliveryOrders = orders.filter(order => order.status === 'out-for-delivery');
  const completedOrders = orders.filter(order => order.status === 'delivered');

  return (
    <div className="buyer-dashboard">
      <div className="dashboard-header">
        <h1>My Orders</h1>
        <p>Welcome back, {user?.companyName}! Track your avocado orders and deliveries</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({pendingOrders.length})
        </button>
        <button 
          className={`tab ${activeTab === 'in-progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('in-progress')}
        >
          In Progress ({acceptedOrders.length + outForDeliveryOrders.length})
        </button>
        <button 
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({completedOrders.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'pending' && (
          <div className="orders-section">
            <div className="section-header">
              <h2>Pending Orders</h2>
            </div>

            <div className="orders-list">
              {pendingOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className="order-status pending">Pending</span>
                  </div>
                  <div className="order-details">
                    <div className="detail-row">
                      <span>Product:</span>
                      <span>{order.type} {order.caliber}</span>
                    </div>
                    <div className="detail-row">
                      <span>Quantity:</span>
                      <span>{order.quantityBoxes} boxes</span>
                    </div>
                    <div className="detail-row">
                      <span>Order Date:</span>
                      <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row total">
                      <span>Total:</span>
                      <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="order-actions">
                    <button className="cancel-btn">Cancel Order</button>
                  </div>
                </div>
              ))}
            </div>

            {pendingOrders.length === 0 && (
              <div className="empty-state">
                <p>No pending orders at the moment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'in-progress' && (
          <div className="orders-section">
            <div className="section-header">
              <h2>In Progress Orders</h2>
            </div>

            {/* Accepted Orders Section */}
            {acceptedOrders.length > 0 && (
              <div className="accepted-orders-section">
                <h3>Accepted Orders</h3>
                <div className="orders-list">
                  {acceptedOrders.map(order => (
                    <div key={order.id} className="order-card accepted">
                      <div className="order-header">
                        <h3>Order #{order.id}</h3>
                        <span className="order-status accepted">Accepted</span>
                      </div>
                      <div className="order-details">
                        <div className="detail-row">
                          <span>Product:</span>
                          <span>{order.type} {order.caliber}</span>
                        </div>
                        <div className="detail-row">
                          <span>Quantity:</span>
                          <span>{order.quantityBoxes} boxes</span>
                        </div>
                        <div className="detail-row">
                          <span>Vendor:</span>
                          <span>Vendor #{order.acceptedVendorId}</span>
                        </div>
                        <div className="detail-row">
                          <span>Order Date:</span>
                          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>
                        <div className="detail-row total">
                          <span>Total:</span>
                          <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="order-actions">
                        <button className="contact-btn">Contact Vendor</button>
                        <button className="track-btn">Track Delivery</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Out for Delivery Orders Section */}
            {outForDeliveryOrders.length > 0 && (
              <div className="delivery-orders-section">
                <h3>Out for Delivery</h3>
                <div className="orders-list">
                  {outForDeliveryOrders.map(order => (
                    <div key={order.id} className="order-card out-for-delivery">
                      <div className="order-header">
                        <h3>Order #{order.id}</h3>
                        <span className="order-status out-for-delivery">Out for Delivery</span>
                      </div>
                      <div className="order-details">
                        <div className="detail-row">
                          <span>Product:</span>
                          <span>{order.type} {order.caliber}</span>
                        </div>
                        <div className="detail-row">
                          <span>Quantity:</span>
                          <span>{order.quantityBoxes} boxes</span>
                        </div>
                        <div className="detail-row">
                          <span>Vendor:</span>
                          <span>Vendor #{order.acceptedVendorId}</span>
                        </div>
                        <div className="detail-row">
                          <span>Order Date:</span>
                          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>
                        <div className="detail-row total">
                          <span>Total:</span>
                          <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="order-actions">
                        <button className="track-btn">Track Delivery</button>
                        <button className="contact-btn">Contact Vendor</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {acceptedOrders.length === 0 && outForDeliveryOrders.length === 0 && (
              <div className="empty-state">
                <p>No orders in progress at the moment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="orders-section">
            <div className="section-header">
              <h2>Completed Orders</h2>
            </div>

            <div className="orders-list">
              {completedOrders.map(order => (
                <div key={order.id} className="order-card completed">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className="order-status completed">Completed</span>
                  </div>
                  <div className="order-details">
                    <div className="detail-row">
                      <span>Product:</span>
                      <span>{order.type} {order.caliber}</span>
                    </div>
                    <div className="detail-row">
                      <span>Quantity:</span>
                      <span>{order.quantityBoxes} boxes</span>
                    </div>
                    <div className="detail-row">
                      <span>Vendor:</span>
                      <span>Vendor #{order.acceptedVendorId}</span>
                    </div>
                    <div className="detail-row">
                      <span>Order Date:</span>
                      <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row total">
                      <span>Total:</span>
                      <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="order-actions">
                    <button className="review-btn">Leave Review</button>
                    <button className="reorder-btn">Reorder</button>
                  </div>
                </div>
              ))}
            </div>

            {completedOrders.length === 0 && (
              <div className="empty-state">
                <p>No completed orders yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
