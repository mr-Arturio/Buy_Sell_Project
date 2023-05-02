/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const productQueries = require('../db/queries/products');

//get all products
router.get('/', (req, res) => {
  productQueries.getProducts()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  productQueries.getProductById(id)
    .then(product => {
      if (!product) {
        res.status(404).json({ error: `Product with ID ${id} not found` });
      } else {
        res.json(product);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const { seller_id, title, description, price, category, photo } = req.body;
  productQueries.createProduct(seller_id, title, description, price, category, photo)
    .then(product => {
      res.status(201).json(product);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { seller_id, title, description, price, category, photo, active } = req.body;
  productQueries.updateProduct(id, seller_id, title, description, price, category, photo, active)
    .then(product => {
      if (!product) {
        res.status(404).json({ error: `Product with ID ${id} not found` });
      } else {
        res.json(product);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  productQueries.deleteProduct(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
