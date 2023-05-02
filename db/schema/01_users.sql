-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< Temporary merge branch 1
  username VARCHAR(255) NOT NULL UNIQUE,
=======
  email VARCHAR(255),
  username VARCHAR(255) NOT NULL,
>>>>>>> Temporary merge branch 2
  password VARCHAR(255),
  created_at TIMESTAMP,
  avatar TEXT
);
