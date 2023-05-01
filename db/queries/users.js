const pool = require('../connection');

const getUsers = () => {
  return pool.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;

    });
};

//Filter by price
const filterByPrice = (price, order) => {
  return db.query(`SELECT $1 FROM products ORDER BY $1 $2`, [price, order])
  .then ((data) => {
    return data.rows[0]
  })
  .catch ((err) => {
    return null
  })
}

module.exports = { getUsers, filterByPrice };

//Get a single user from the database given their email.
const getUserWithEmail = function (pool, email) {
  return pool
    .query(
      `SELECT *
       FROM users
       WHERE email = $1`,
      [email]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];

    })
    .catch((err) => {
      throw new Error(`Error getting user with email: ${err.message}`);
    });
};

// //Get a single user from the database given their email.
// const getUserWithEmail = function (pool, email) {
//   return pool
//     .query(
//       `SELECT *
//        FROM users
//        WHERE email = $1`,
//       [email]
//     )
//     .then((result) => {
//       if (result.rows.length === 0) {
//         return null;
//       }
//       return result.rows[0];
//     })
//     .catch((err) => {
//       throw new Error(`Error getting user with email: ${err.message}`);
//     });
// };

//Get a single user from the database given their id.
const getUserWithId = function (usersId) {
  return pool
    .query(
      `SELECT *
       FROM users
       WHERE users.id = $1`,
      [usersId]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      throw new Error(`Error getting user with email: ${err.message}`);
    });
};


//Add a new user to the database.
const addUser = function (user) {
  return pool
    .query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user.name, user.email, user.password]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      throw new Error(`Error getting user with email: ${err.message}`);
    });
};


module.exports = {
  getUsers,
  // getUserWithEmail,
  getUserWithId,
  addUser,
  filterByPrice
 };

