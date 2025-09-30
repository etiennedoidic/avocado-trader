import React from 'react';
import html2pdf from 'html2pdf.js';

const LetterOfIntent = ({ order, vendor, buyer, onClose }) => {
  const generatePDF = () => {
    const element = document.getElementById('letter-content');
    const filename = `letterofintent-${formatDateForFilename(order.orderDate)}.pdf`;
    
    const opt = {
      margin: 1,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const formatDateForFilename = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}${month}${year}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="letter-modal-overlay">
      <div className="letter-modal-content">
        <div className="letter-header">
          <h2>Letter of Intent</h2>
          <div className="letter-actions">
            <button onClick={generatePDF} className="download-btn">
              Download PDF
            </button>
            <button onClick={onClose} className="close-btn">
              Close
            </button>
          </div>
        </div>

        <div id="letter-content" className="letter-content">
          <div className="letter-header-section">
            <div className="letter-date">
              Date: {formatDate(new Date())}
            </div>
          </div>

          <div className="letter-body">
            <div className="letter-greeting">
              <p>Dear {vendor.name},</p>
            </div>

            <div className="letter-main">
              <p>
                We are pleased to inform you that <strong>{buyer.companyName}</strong> has accepted 
                your proposal for the following avocado order:
              </p>

              <div className="order-details-section">
                <h3>Order Details</h3>
                <table className="order-table">
                  <tbody>
                    <tr>
                      <td><strong>Order ID:</strong></td>
                      <td>#{order.id}</td>
                    </tr>
                    <tr>
                      <td><strong>Product:</strong></td>
                      <td>{order.type} Avocados - Caliber {order.caliber}</td>
                    </tr>
                    <tr>
                      <td><strong>Quantity:</strong></td>
                      <td>{order.quantityBoxes} boxes</td>
                    </tr>
                    <tr>
                      <td><strong>Price per Box:</strong></td>
                      <td>${order.item?.pricePerBox?.toFixed(2) || '45.00'}</td>
                    </tr>
                    <tr>
                      <td><strong>Total Amount:</strong></td>
                      <td>${order.totalAmount?.toFixed(2) || '90000.00'}</td>
                    </tr>
                    <tr>
                      <td><strong>Order Date:</strong></td>
                      <td>{formatDate(order.orderDate)}</td>
                    </tr>
                    <tr>
                      <td><strong>Delivery Date:</strong></td>
                      <td>{formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="letter-terms">
                <h3>Terms and Conditions</h3>
                <ul>
                  <li>Payment terms: Net 30 days from delivery</li>
                  <li>Quality standards: Grade A avocados, properly ripened</li>
                  <li>Packaging: Standard avocado boxes, properly labeled</li>
                  <li>Delivery: FOB destination, buyer's warehouse</li>
                  <li>Inspection: 48-hour inspection period upon delivery</li>
                  <li>Force majeure: Standard agricultural force majeure clauses apply</li>
                </ul>
              </div>

              <div className="letter-signature">
                <p>
                  This letter of intent confirms our commitment to proceed with this transaction 
                  subject to the terms outlined above. A formal purchase order will follow 
                  within 48 hours.
                </p>
                
                <div className="signature-block">
                  <p><strong>Buyer Information:</strong></p>
                  <p>{buyer.companyName}</p>
                  <p>Contact: {buyer.contactName}</p>
                  <p>Email: {buyer.email}</p>
                  <p>Phone: {buyer.phone}</p>
                  <p>Address: {buyer.address}</p>
                </div>
              </div>
            </div>

            <div className="letter-closing">
              <p>Sincerely,</p>
              <p><strong>{buyer.contactName}</strong></p>
              <p>Procurement Manager</p>
              <p>{buyer.companyName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterOfIntent;

