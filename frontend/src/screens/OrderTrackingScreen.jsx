import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './OrderTrackingScreen.css';

const OrderTrackingScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) return <div className="loader">Loading Orders...</div>;

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {error && <div className="error-message">{error}</div>}
      {orders.length === 0 ? (
        <div className="no-orders">You have no orders yet.</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order ID: {order._id}</h3>
                <span className={`status ${order.isDelivered ? 'delivered' : 'pending'}`}>
                  {order.isDelivered ? 'Delivered' : 'Pending'}
                </span>
              </div>
              <div className="order-details">
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${order.totalPrice}</p>
                <p><strong>Payment:</strong> {order.isPaid ? 'Paid' : 'Not Paid'}</p>
              </div>
              <div className="order-items">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="item">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name} x {item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingScreen;
