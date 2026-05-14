import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, CreditCard, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const handlePayment = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setPaying(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress: {
          address: '123 Main St',
          city: 'Anytown',
          postalCode: '12345',
          country: 'USA'
        },
        paymentMethod: 'Credit Card',
        totalPrice: cartTotal,
      };

      await axios.post('/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowModal(true);
      clearCart();
    } catch (error) {
      console.error('Payment error', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 className="screen-title">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn" style={{ width: 'auto' }}>
            Go Back
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <p className="text-muted">Qty: {item.qty}</p>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item._id)}
                  title="Remove from cart"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              className="btn" 
              onClick={handlePayment} 
              disabled={paying}
              style={{ marginTop: '1rem' }}
            >
              <CreditCard size={20} />
              {paying ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CheckCircle size={64} className="success-icon" />
            <h2 className="modal-title">Payment Successful!</h2>
            <p className="modal-text">Thank you for your purchase.</p>
            <Link to="/" className="btn" onClick={closeModal}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartScreen;
