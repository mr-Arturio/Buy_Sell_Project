const pool = require('../connection');

//Get all favorites
const getAllFavorites = () => {
  return pool
    .query(
      'SELECT * FROM favorites JOIN products ON products.id = product_id;'
    )
    .then(data => data.rows)
    .catch(error => {
      console.error(error);
      throw new Error('Unable to get favorites.');
    });
};

// Get all favorites for a given user
const getFavorites = (userId) => {
  return pool
    .query(
      'SELECT f.id AS favorite_id, f.user_id, p.* FROM favorites f JOIN products p ON f.product_id = p.id WHERE f.user_id = $1',
      [userId]
    )
    .then(data => data.rows)
    .catch(error => {
      console.error(error);
      throw new Error('Unable to get favorites.');
    });
};

// Add a new favorite for a given user
const addFavorite = (productId, userId) => {
  return pool
    .query(
      'INSERT INTO favorites (product_id, user_id) VALUES ($1, $2) RETURNING *',
      [productId, userId]
    )
    .then(data => data.rows[0])
    .catch(error => {
      console.error(error);
      throw new Error('Unable to add favorite.');
    });
};

// Remove a favorite from db
const removeFavorite = (favoriteId) => {
  return pool
    .query(
      'DELETE FROM favorites WHERE id=$1',
      [favoriteId]
    )
    .catch(error => {
      console.error(error);
      throw new Error('Unable to remove favorite.');
    });
};

module.exports = {
  getAllFavorites,
  getFavorites,
  addFavorite,
  removeFavorite
};
