// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static('docs'));

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const productApiRoutes = require('./routes/products-api');
const favoritesRoutes = require('./routes/favorites-api');
const usersRoutes = require('./routes/users');
const { DatabaseError } = require('pg');
const pool = require('./db/connection');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/products', productApiRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  //notes on making a product box a clickable item & tie it to a DB
  // add request to DB
  //then with DB response, render Index view
  // pass [] or {}
  res.render('index', { items: [{ title: "example" }, { title: "example 2" }] });
});


app.get('/account', (req, res) => {
  res.render('account');
});

app.get('/favorites', (req, res) => {
  res.render('favorites');
});


app.get('/post-product', (req, res) => {
  res.render('post-product');
});

app.get('/index', (req, res) => {
  pool.query('SELECT * FROM products')
    .then((result) => {
      const products = result.rows;
      res.render('index', { products });
    })
    .catch((err) => {
      console.error('Error executing query', err.stack);
      res.send('Error occurred while fetching data');
    });
});



app.listen(PORT, () => {
  console.log(`PlayNation is alive on port ${PORT}`);
});
