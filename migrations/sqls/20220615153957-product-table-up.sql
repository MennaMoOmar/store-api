/* create product table */
-- uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create table
CREATE TABLE products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  category_id uuid NOT NULL,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories (id)
);