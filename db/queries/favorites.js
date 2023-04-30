const pool = require('../connection');

//get all favourites from one buyer
const getFavorites = (buyer) => {
  return pool
  .query(
    'SELECT * FROM favorites WHERE users_id = $1',
    [buyer]
    )
    .then(data => {
      return data.rows[0];
    });
};

//add to favourites
const addFavorite = (products_id, users_id) => {
  return pool
  .query(
    'INSERT INTO favorites (products_id, users_id) VALUES ($1, $2) RETURNING *;',
    [products_id, users_id]
    )
    .then(data => {
      return data.rows[0];
    });
};


//delete favourites
const deleteFavorite = (id) => {
  return pool
  .query(
    'DELETE FROM favorites WHERE id = $1',
    [id]
    )
  };

  module.exports = {
    deleteFavorite,
    addFavorite,
    getFavorites
  };