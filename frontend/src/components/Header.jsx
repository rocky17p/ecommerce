import { Link } from 'react-router-dom';
import { ShoppingCart, Store, User, LogOut, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { cartItems } = useCart();
  const { user, logout } = useContext(AuthContext);
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Store size={28} />
          <span>ProShop Nexa</span>
        </Link>
        <nav className="nav-links">
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={24} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
          
          {user ? (
            <>
              <Link to="/orders" className="nav-link">
                <Package size={24} />
                <span>My Orders</span>
              </Link>
              <div className="user-info">
                <User size={24} />
                <span>{user.name}</span>
                <button onClick={logout} className="logout-btn">
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              <User size={24} />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
