/* create order_product table */
-- uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create table
CREATE TABLE order_products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity INTEGER,
  order_id uuid NOT NULL,
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id),
  product_id uuid NOT NULL,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products (id)
);