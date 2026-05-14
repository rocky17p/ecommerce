import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to sample data if backend is not running or connected
        setProducts([
          {
            _id: '1',
            name: 'Airpods Wireless Headphones',
            image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&q=80',
            price: 89.99,
            countInStock: 10,
          },
          {
            _id: '2',
            name: 'iPhone 13 Pro 256GB',
            image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80',
            price: 999.99,
            countInStock: 7,
          },
          {
            _id: '3',
            name: 'Cannon EOS 80D DSLR Camera',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
            price: 929.99,
            countInStock: 5,
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="screen-title">Latest Products</h1>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
