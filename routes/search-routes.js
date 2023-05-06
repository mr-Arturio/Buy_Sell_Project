const express = require('express');
const router = express.Router();
const searchQuery = require ('../db/queries/search');

router.get('/', (req, res) => {
  const query = req.query.name
  searchQuery.searchDatabse(query)
  .then (results => {
    console.log("RESULTS--->", results)
    res.render('search', {results} )

  })
  .catch(error => {
    console.error(error);
    res.status(500).send("An error occored while searching the database")
  })
})

module.exports = router;
