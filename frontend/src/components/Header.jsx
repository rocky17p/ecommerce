import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
