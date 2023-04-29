-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS favortites CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255),
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  created_at TIMESTAMP,
  avatar TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  photo TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  products_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  users_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


