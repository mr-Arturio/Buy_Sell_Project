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

// Add a new favorite for a given user
router.post('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.body.productId;

  favoritesQueries.addFavorite(userId, productId)
    .then(favorite => {
      res.status(201).json(favorite);
    })
    .catch(error => next(error));
});

// Remove a favorite for a given user
router.delete('/:userId/:favoriteId', (req, res, next) => {
  const userId = req.params.userId;
  const favoriteId = req.params.favoriteId;

  favoritesQueries.removeFavorite(userId, favoriteId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(error => next(error));
});

module.exports = router;