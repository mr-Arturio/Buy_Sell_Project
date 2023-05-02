const pool = require('../connection');

const getProducts = () => {
  return pool
    .query(
      'SELECT * FROM products;'
    )
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      throw new Error(`Error getting products: ${err.message}`);
    });
};

const getProductById = (id) => {
  return pool
    .query(
      'SELECT * FROM products WHERE id = $1;', 
      [id]
    )
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      throw new Error(`Error getting product by id: ${err.message}`);
    });
};

// add product to the database
const createProduct = (sellerId, title, description, price, category, photo) => {
  return pool
    .query(
      'INSERT INTO products (seller_id, title, description, price, category, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [sellerId, title, description, price, category, photo]
    )
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      throw new Error(`Error creating product: ${err.message}`);
    });
};

// update product
const updateProduct = (id, sellerId, title, description, price, category, photo) => {
  return pool
    .query(
      'UPDATE products SET seller_id = $1, title = $2, description = $3, price = $4, category = $5, photo = $6 WHERE id = $7 RETURNING *;',
      [sellerId, title, description, price, category, photo, id]
    )
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      throw new Error(`Error updating product: ${err.message}`);
    });
};

// Filter by price
const filterByPrice = (price, order) => {
  return pool
    .query(
      'SELECT * FROM products WHERE price < $1 ORDER BY price $2;',
      [price, order]
    )
    .then ((data) => {
      return data.rows;
    })
    .catch ((err) => {
      throw new Error(`Error filtering products by price: ${err.message}`);
    });
};

// delete product
const deleteProduct = (id) => {
  return pool
    .query(
      'DELETE FROM products WHERE id = $1;', 
      [id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return null;
      }
      return result.rowCount;
    })
    .catch((err) => {
      throw new Error(`Error deleting product: ${err.message}`);
    });
};

module.exports = { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  filterByPrice
};
