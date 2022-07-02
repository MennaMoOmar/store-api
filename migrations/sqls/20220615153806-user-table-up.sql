/* create table users */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);