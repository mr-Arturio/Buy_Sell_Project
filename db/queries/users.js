const pool = require('../connection');

const getUsers = () => {
  return pool
    .query(
      'SELECT * FROM users;'
    )
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      throw new Error(`Error getting user with email: ${err.message}`);
    });
};

// //Get a single user from the database given their email.
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

//Get a single user from the database given their id.
const getUserById = function (usersId) {
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
      throw new Error(`Error getting user with id: ${err.message}`);
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
      throw new Error(`Error adding user: ${err.message}`);
    });
};

//delete
const deleteUser = (id) => {
  return pool
    .query(
      'DELETE FROM users WHERE id = $1;',
      [id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return null;
      }
      return result.rowCount;
    })
    .catch((err) => {
      throw new Error(`Error deleting user: ${err.message}`);
    });
};


module.exports = {
  getUsers,
  getUserWithEmail,
  getUserById,
  addUser,
  deleteUser
};

