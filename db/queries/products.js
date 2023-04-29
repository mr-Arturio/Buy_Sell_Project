const db = require('../connection');

const getProducts = () => {
  return db
    .query(
      'SELECT *FROM products;'
    )
    .then(data => {
      return data.rows;
    });
};

const getProductById = (id) => {
  return db
  .query(
    'SELECT * FROM products WHERE id = $1;', 
    [id]
    )
    .then(data => {
      return data.rows[0];
    });
};

//add prodact to the database
const createProduct = (sellerId, title, description, price, category, photo) => {
  return db
  .query(
    'INSERT INTO products (seller_id, title, description, price, category, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
     [sellerId, title, description, price, category, photo]
     )
    .then(data => {
      return data.rows[0];
    });
};

//update product
const updateProduct = (id, sellerId, title, description, price, category, photo) => {
  return db
  .query(
    'UPDATE products SET seller_id = $1, title = $2, description = $3, price = $4, category = $5, photo = $6 WHERE id = $7 RETURNING *;',
     [sellerId, title, description, price, category, photo, id]
     )
    .then(data => {
      return data.rows[0];
    });
};

//delete
const deleteProduct = (id) => {
  return db
  .query(
    'DELETE FROM products WHERE id = $1;', 
    [id]
    );
};

module.exports = { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
};