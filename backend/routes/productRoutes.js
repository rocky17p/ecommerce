import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Simulate Payment
// @route   POST /api/products/pay
// @access  Public
router.post('/pay', async (req, res) => {
  try {
    // Fake payment logic
    const { amount } = req.body;
    if (amount && amount > 0) {
      res.json({ success: true, message: 'Payment successful!' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid amount' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error during payment' });
  }
});

export default router;
