const express = require("express");
const sellProduct = require ('../public/scripts/sell_products.js');
const router = express.Router()

router.post("/index", (req, res) => {
  sellProduct
    .addProducts(req.body)
    .then((products) => {
      res.redirect('/index')
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    })
})

module.exports = router;
