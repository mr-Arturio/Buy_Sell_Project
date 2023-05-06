// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  max: 20 // Maximum number of connections in the pool
};

const pool = new Pool(dbParams);

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database', err.stack);
  } else {
    console.log('Connected to database');
    release(); // Release the client back to the pool
  }
});


const addProducts = function (products) {
  return pool
  .query(
   `INSERT INTO products(title, price, photo, category, description)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *`, [products.title, products.price, products.photo, products.category, products.description])
   .then(res => res.rows[0])
   .catch((err) => {
    return null
   })
}


module.exports = {
  addProducts
}
