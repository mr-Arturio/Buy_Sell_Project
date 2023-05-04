const pool = require('../connection');

const searchDatabse = (search) => {
  return pool
  .query(
    `SELECT * FROM products WHERE title LIKE '%$1%'
    OR description LIKE '%$1%'
    OR price LIKE '%$1'
    OR category LIKE '%$1' ;`,[search]
  )
  .then(data => {
  console.log('data', data.rows);
    return data.rows;
  })
  .catch ((err) => {
    throw new Error(`Error getting products title: ${err.message}`)
  })
}
let element = 'Playstation 5 Console'
searchDatabse(element);


module.exports = {
searchDatabse
}
