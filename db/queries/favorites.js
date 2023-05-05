const pool = require('../connection');

//Get all favorites


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

// Remove a favorite for a given user
const removeFavorite = (userId, favoriteId) => {
  return pool
    .query(
      'DELETE FROM favorites WHERE user_id = $1 AND id = $2',
      [userId, favoriteId]
    )
    .catch(error => {
      console.error(error);
      throw new Error('Unable to remove favorite.');
    });
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
