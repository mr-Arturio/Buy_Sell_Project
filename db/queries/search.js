const pool = require('../connection');

const searchDatabse = (search) => {
  return pool
  .query(
    `SELECT * FROM products
    WHERE title ILIKE $1
    OR description ILIKE $1
    OR category ILIKE $1 ;`,['%' +search+ '%']
  )
  .then(data => {
    return data.rows;
  })
  .catch ((err) => {
    throw new Error(`Error getting products title: ${err.message}`)
  })
}



module.exports = {
searchDatabse
}
