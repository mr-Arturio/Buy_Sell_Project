const express = require('express');
const router = express.Router();
const favoritesQueries = require('../db/queries/favorites');

// Get all favorites
router.get('/', (req, res, next) => {
  favoritesQueries.getAllFavorites()
    .then(favorites => {
      res.render('favorites', { favorites });
    })
    .catch(error => next(error));
});

// Get all favorites for a given user
router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;

  favoritesQueries.getFavorites(userId)
    .then(favorites => {
      res.json(favorites);
    })
    .catch(error => next(error));
});

//add to favorites
router.post('/', (req, res, next) => {
  const productId = req.body.productId;
  const userId = 3;
  favoritesQueries.addFavorite(productId, userId)
    .then(favorite => {
      res.json(favorite);
    })
    .catch(error => next(error));
});

// Remove a favorite
router.delete('/', (req, res, next) => {
  const favoriteId = req.params.favoriteId;

  favoritesQueries.removeFavorite(favoriteId)
    .then(() => {
      res.sendStatus(204);

    })
    .catch(error => next(error));
});



module.exports = router;