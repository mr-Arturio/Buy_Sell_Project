/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const pool = require('../db/connection');


//Getting all users
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Get a single user by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  userQueries.getUserById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ error: `User with ID ${id} not found` });
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// //Create a new user
// router.post('/', (req, res) => {
//   const { username, password, avatar } = req.body;
//   userQueries.createUser(username, password, avatar)
//     .then(user => {
//       res.status(201).json(user);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// //Update an existing user
// router.put('/:id', (req, res) => {
//   const id = req.params.id;
//   const { username, password, avatar } = req.body;
//   userQueries.updateUser(id, username, password, avatar)
//     .then(user => {
//       if (!user) {
//         res.status(404).json({ error: `User with ID ${id} not found` });
//       } else {
//         res.json(user);
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message });
//     });
// });

// // Route for logging in a user
// router.post('/login', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;


//   userQueries.getUserWithEmail(pool, email).then((user) => {
//     if (!user) {
//       return res.send({ error: "no user with that id" });
//     }

//     if (!bcrypt.compareSync(password, user.password)) {
//       return res.send({ error: "error" });
//     }

//     req.session.userId = user.id;
//     res.send({
//       user: {
//         name: user.name,
//         email: user.email,
//         id: user.id,
//       },
//     });
//   });
// });

// Route for logging out a user
router.post('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/');
});

//Delete a user
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  userQueries.deleteUser(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;