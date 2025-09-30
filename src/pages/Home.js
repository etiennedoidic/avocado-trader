import React, { useState, useEffect } from 'react';
import { mockInventory, avocadoTypes, calibers } from '../utils/mockData';
import './Home.css';

const Home = ({ onPlaceOrder }) => {
  const [inventory, setInventory] = useState(mockInventory);
  const [filteredInventory, setFilteredInventory] = useState(mockInventory);
  const [filters, setFilters] = useState({
    type: '',
    caliber: '',
    minPrice: 0,
    maxPrice: 100
  });
  const [autoOrder, setAutoOrder] = useState({
    type: '',
    caliber: '',
    minPrice: 0,
    maxPrice: 100,
    quantity: 2000
  });
  const [showAutoOrderForm, setShowAutoOrderForm] = useState(false);

  useEffect(() => {
    let filtered = inventory;

    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    if (filters.caliber) {
      filtered = filtered.filter(item => item.caliber === filters.caliber);
    }

    filtered = filtered.filter(item => 
      item.pricePerBox >= filters.minPrice && 
      item.pricePerBox <= filters.maxPrice
    );

    setFilteredInventory(filtered);
  }, [filters, inventory]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePlaceOrder = (item) => {
    onPlaceOrder(item);
  };

  const handleAutoOrderChange = (field, value) => {
    setAutoOrder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendAutoOrder = () => {
    const avgPrice = (autoOrder.minPrice + autoOrder.maxPrice) / 2;
    const totalAmount = avgPrice * autoOrder.quantity;
    
    const confirmMessage = `Send order?\n1 container (${autoOrder.quantity} boxes) for $${avgPrice.toFixed(2)} ${autoOrder.type} ${autoOrder.caliber}.\nYou can cancel this.`;
    
    if (window.confirm(confirmMessage)) {
      // Create a mock item for the auto order
      const autoOrderItem = {
        id: Date.now(),
        type: autoOrder.type,
        caliber: autoOrder.caliber,
        pricePerBox: avgPrice,
        quantityBoxes: autoOrder.quantity,
        vendorName: 'Auto-Match Vendor',
        location: 'TBD',
        harvestDate: 'TBD',
        vendorId: 999
      };
      
      onPlaceOrder(autoOrderItem);
      setShowAutoOrderForm(false);
      setAutoOrder({
        type: '',
        caliber: '',
        minPrice: 0,
        maxPrice: 100,
        quantity: 2000
      });
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Fresh Avocado Marketplace</h1>
        <p>Connect directly with premium avocado suppliers worldwide</p>
      </div>

      <div className="auto-order-section">
        <div className="auto-order-header">
          <h2>Not sure who to pick?</h2>
          <p>Place an order at a set price and we will automatically fill the order at that price as soon as inventory is available.</p>
        </div>
        
        {!showAutoOrderForm ? (
          <button 
            className="auto-order-btn"
            onClick={() => setShowAutoOrderForm(true)}
          >
            Set Up Automatic Order
          </button>
        ) : (
          <div className="auto-order-form">
            <div className="form-row">
              <div className="form-group">
                <label>Type:</label>
                <select 
                  value={autoOrder.type} 
                  onChange={(e) => handleAutoOrderChange('type', e.target.value)}
                >
                  <option value="">Select Type</option>
                  {avocadoTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Caliber:</label>
                <select 
                  value={autoOrder.caliber} 
                  onChange={(e) => handleAutoOrderChange('caliber', e.target.value)}
                >
                  <option value="">Select Caliber</option>
                  {calibers.map(caliber => (
                    <option key={caliber} value={caliber}>{caliber}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price Range: ${autoOrder.minPrice} - ${autoOrder.maxPrice}</label>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={autoOrder.minPrice}
                    onChange={(e) => handleAutoOrderChange('minPrice', parseInt(e.target.value))}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={autoOrder.maxPrice}
                    onChange={(e) => handleAutoOrderChange('maxPrice', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Quantity (boxes):</label>
                <input
                  type="number"
                  min="100"
                  max="10000"
                  step="100"
                  value={autoOrder.quantity}
                  onChange={(e) => handleAutoOrderChange('quantity', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowAutoOrderForm(false)}
              >
                Cancel
              </button>
              <button 
                className="send-order-btn"
                onClick={handleSendAutoOrder}
                disabled={!autoOrder.type || !autoOrder.caliber}
              >
                Send Order
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="filters-section">
        <h2>Available Inventory</h2>
        <div className="filters">
          <div className="filter-group">
            <label>Type:</label>
            <select 
              value={filters.type} 
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              {avocadoTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Caliber:</label>
            <select 
              value={filters.caliber} 
              onChange={(e) => handleFilterChange('caliber', e.target.value)}
            >
              <option value="">All Calibers</option>
              {calibers.map(caliber => (
                <option key={caliber} value={caliber}>{caliber}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range: ${filters.minPrice} - ${filters.maxPrice}</label>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="inventory-grid">
        {filteredInventory.map(item => (
          <div key={item.id} className="inventory-card">
            <div className="card-header">
              <h3>{item.type} - {item.caliber}</h3>
              <span className="vendor-name">{item.vendorName}</span>
            </div>
            
            <div className="card-content">
              <div className="price">${item.pricePerBox.toFixed(2)}/box</div>
              <div className="quantity">{item.quantityBoxes} boxes available</div>
              <div className="location">📍 {item.location}</div>
              <div className="harvest-date">Harvested: {item.harvestDate}</div>
            </div>

            <div className="card-actions">
              <button 
                className="order-btn"
                onClick={() => handlePlaceOrder(item)}
              >
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInventory.length === 0 && (
        <div className="no-results">
          <p>No inventory matches your filters. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
