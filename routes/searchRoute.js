const express = require('express');
const router = express.Router();
const searchQuery = require ('../db/queries/search');

router.get('/search', (req, res) => {
  searchQuery.searchDatabse()
  .then (results => {
    res.json(results)
  })
  .catch(error => {
    console.error(error);
    res.status(500).send("An error occored while searching the database")
  })
})
