/* create category table */
-- uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- create table
CREATE TABLE categories(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);