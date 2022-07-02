/* create order table */
-- uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- status type
CREATE TYPE status_type AS ENUM ('active', 'complete');

-- create table
CREATE TABLE orders(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  status status_type NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT fk_user_order FOREIGN KEY (user_id) REFERENCES users (id)
);