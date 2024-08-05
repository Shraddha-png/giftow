const express = require('express');
const router = express.Router();
const Product = require('../models/productModel')

router.get('/products', async (req, res) => {
    try {
      const { search } = req.query;
      let products = await Product.find({}).lean();
  
      if (search) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products');
    }
  });
  
  module.exports = router;