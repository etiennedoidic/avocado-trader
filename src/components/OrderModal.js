import React, { useState } from 'react';
import './OrderModal.css';

const OrderModal = ({ isOpen, onClose, item, onConfirmOrder }) => {
  const [orderDetails, setOrderDetails] = useState({
    quantity: 2000,
    orderDate: ''
  });

  const [step, setStep] = useState(1); // 1: Order details, 2: Confirmation, 3: Payment

  if (!isOpen || !item) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate order details
      if (!orderDetails.orderDate) {
        alert('Please select an order date');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleConfirmOrder = () => {
    const order = {
      ...orderDetails,
      item,
      totalAmount: orderDetails.quantity * item.pricePerBox,
      status: 'pending'
    };
    onConfirmOrder(order);
    onClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Place Order - {item.type} {item.caliber}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {step === 1 && (
            <div className="order-form">
              <div className="form-group">
                <label>Quantity (boxes):</label>
                <input
                  type="number"
                  name="quantity"
                  value={orderDetails.quantity}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Order Date:</label>
                <input
                  type="date"
                  name="orderDate"
                  value={orderDetails.orderDate}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  required
                />
                <small>Orders can only be placed for the next 1-2 days</small>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="order-confirmation">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Product:</span>
                  <span>{item.type} {item.caliber} from {item.vendorName}</span>
                </div>
                <div className="summary-row">
                  <span>Quantity:</span>
                  <span>{orderDetails.quantity} boxes</span>
                </div>
                <div className="summary-row">
                  <span>Price per box:</span>
                  <span>${item.pricePerBox.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Order Date:</span>
                  <span>{formatDate(orderDetails.orderDate)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>${(orderDetails.quantity * item.pricePerBox).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="payment-section">
              <h3>Payment Information</h3>
              <p>This is a demo payment flow. In a real application, this would integrate with Stripe.</p>
              
              <div className="payment-form">
                <div className="form-group">
                  <label>Card Number:</label>
                  <input type="text" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="form-group">
                  <label>Expiry Date:</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV:</label>
                  <input type="text" placeholder="123" />
                </div>
                <div className="form-group">
                  <label>Cardholder Name:</label>
                  <input type="text" placeholder="John Doe" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          
          {step > 1 && (
            <button className="btn-secondary" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          
          {step < 3 ? (
            <button className="btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn-primary" onClick={handleConfirmOrder}>
              Confirm & Pay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
