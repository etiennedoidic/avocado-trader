import React, { useState, useEffect } from 'react';
import { mockInventory, mockOrders } from '../utils/mockData';
import LetterOfIntent from '../components/LetterOfIntent';
import './VendorDashboard.css';

const VendorDashboard = ({ user, orders: appOrders = [], onOrderUpdate }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newItem, setNewItem] = useState({
    type: '',
    caliber: '',
    quantityBoxes: '',
    pricePerBox: ''
  });

  useEffect(() => {
    // Filter inventory and orders for the current vendor
    const vendorInventory = mockInventory.filter(item => item.vendorId === user.id);
    
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
    
    // Convert back to array and filter for vendor
    const allOrders = Array.from(orderMap.values());
    const vendorOrders = allOrders.filter(order => 
      order.acceptedVendorId === user.id || 
      (order.status === 'pending' && vendorInventory.some(item => 
        item.type === order.type && item.caliber === order.caliber
      ))
    );
    
    setInventory(vendorInventory);
    setOrders(vendorOrders);
  }, [user.id, appOrders]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      vendorId: user.id,
      vendorName: user.name,
      ...newItem,
      quantityBoxes: parseInt(newItem.quantityBoxes),
      pricePerBox: parseFloat(newItem.pricePerBox),
      location: user.location || 'Unknown',
      harvestDate: new Date().toISOString().split('T')[0]
    };
    
    setInventory(prev => [...prev, item]);
    setNewItem({ type: '', caliber: '', quantityBoxes: '', pricePerBox: '' });
    setShowAddForm(false);
  };

  const handleDeleteItem = (itemId) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAcceptOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'accepted', acceptedVendorId: user.id }
        : order
    );
    
    setOrders(updatedOrders);
    
    // Update the main app orders state
    if (onOrderUpdate) {
      onOrderUpdate(updatedOrders);
    }
    
    // Show success message
    alert('Order accepted! A letter of intent has been generated and will be emailed to the buyer.');
  };

  const handleMarkOutForDelivery = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'out-for-delivery' }
        : order
    );
    
    setOrders(updatedOrders);
    
    // Update the main app orders state
    if (onOrderUpdate) {
      onOrderUpdate(updatedOrders);
    }
    
    alert('Order marked as out for delivery!');
  };

  const handleCompleteOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'delivered' }
        : order
    );
    
    setOrders(updatedOrders);
    
    // Update the main app orders state
    if (onOrderUpdate) {
      onOrderUpdate(updatedOrders);
    }
    
    alert('Order completed successfully!');
  };

  const handleViewLetter = (order) => {
    setSelectedOrder(order);
    setShowLetterModal(true);
  };

  const formatDateForFilename = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}${month}${year}`;
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const acceptedOrders = orders.filter(order => order.status === 'accepted');
  const outForDeliveryOrders = orders.filter(order => order.status === 'out-for-delivery');
  const completedOrders = orders.filter(order => order.status === 'delivered');

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>Manage your inventory and orders</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory Management
        </button>
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
        {activeTab === 'inventory' && (
          <div className="inventory-section">
            <div className="section-header">
              <h2>Your Inventory</h2>
              <button 
                className="add-btn"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Cancel' : 'Add New Item'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddItem} className="add-item-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Type:</label>
                    <select
                      value={newItem.type}
                      onChange={(e) => setNewItem(prev => ({ ...prev, type: e.target.value }))}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Hass">Hass</option>
                      <option value="Fuerte">Fuerte</option>
                      <option value="Bacon">Bacon</option>
                      <option value="Zutano">Zutano</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Caliber:</label>
                    <select
                      value={newItem.caliber}
                      onChange={(e) => setNewItem(prev => ({ ...prev, caliber: e.target.value }))}
                      required
                    >
                      <option value="">Select Caliber</option>
                      <option value="48">48</option>
                      <option value="60">60</option>
                      <option value="70">70</option>
                      <option value="84">84</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Quantity (boxes):</label>
                    <input
                      type="number"
                      value={newItem.quantityBoxes}
                      onChange={(e) => setNewItem(prev => ({ ...prev, quantityBoxes: e.target.value }))}
                      required
                      min="1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Price per box ($):</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.pricePerBox}
                      onChange={(e) => setNewItem(prev => ({ ...prev, pricePerBox: e.target.value }))}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn">Add Item</button>
              </form>
            )}

            <div className="inventory-grid">
              {inventory.map(item => (
                <div key={item.id} className="inventory-card">
                  <div className="card-header">
                    <h3>{item.type} - {item.caliber}</h3>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="card-content">
                    <div className="price">${item.pricePerBox.toFixed(2)}/box</div>
                    <div className="quantity">{item.quantityBoxes} boxes</div>
                    <div className="harvest-date">Harvested: {item.harvestDate}</div>
                  </div>
                </div>
              ))}
            </div>

            {inventory.length === 0 && (
              <div className="empty-state">
                <p>No inventory items yet. Add your first item to get started!</p>
              </div>
            )}
          </div>
        )}

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
                      <span>Buyer:</span>
                      <span>{order.buyerName}</span>
                    </div>
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
                    <button 
                      className="accept-btn"
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Accept Order
                    </button>
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
                          <span>Buyer:</span>
                          <span>{order.buyerName}</span>
                        </div>
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
                        <button 
                          className="letter-btn"
                          onClick={() => handleViewLetter(order)}
                        >
                          View Letter of Intent
                        </button>
                        <button 
                          className="delivery-btn"
                          onClick={() => handleMarkOutForDelivery(order.id)}
                        >
                          Mark Out for Delivery
                        </button>
                        <div className="pdf-filename">
                          letterofintent-{formatDateForFilename(order.orderDate)}.pdf
                        </div>
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
                          <span>Buyer:</span>
                          <span>{order.buyerName}</span>
                        </div>
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
                        <button 
                          className="complete-btn"
                          onClick={() => handleCompleteOrder(order.id)}
                        >
                          Mark as Completed
                        </button>
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
                      <span>Buyer:</span>
                      <span>{order.buyerName}</span>
                    </div>
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
                    <button 
                      className="letter-btn"
                      onClick={() => handleViewLetter(order)}
                    >
                      View Letter of Intent
                    </button>
                    <div className="pdf-filename">
                      letterofintent-{formatDateForFilename(order.orderDate)}.pdf
                    </div>
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

      {/* Letter of Intent Modal */}
      {showLetterModal && selectedOrder && (
        <LetterOfIntent
          order={selectedOrder}
          vendor={user}
          buyer={{
            companyName: selectedOrder.buyerName,
            contactName: 'John Doe', // Mock buyer contact
            email: 'buyer@company.com',
            phone: '555-0123',
            address: '123 Business St, City, State 12345'
          }}
          onClose={() => {
            setShowLetterModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default VendorDashboard;
