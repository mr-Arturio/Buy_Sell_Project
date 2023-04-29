const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const filterByPrice = (price) => {
  return db.query(`SELECT $1 FROM products ORDER BY $1 desc`, [price])
  .then ((data) => {
    return data.rows[0]
  })
  .catch ((err) => {
    return null
  })
}

module.exports = { getUsers, filterByPrice };
