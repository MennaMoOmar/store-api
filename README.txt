//// Image Processing API
"This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js
We build image processing Api which take image name, width and height then return peocessed image"

//// Usage
Installation:
$ npm install
Start:
$ npm Start
Dev:
$ npm run dev
Build:
$ npm run Build
Test:
$ npm test
Format files using prettire:
$ npm run format:check
$ npm run format:write
Lint files using eslint:
$ npm run lint:check
$ npm run lint:fix
Migration:
$ px db-migrate up
Migration Up:
$ npm run migration:run
Migration Down:
$ npm run migration:down

//// Creating database
Create Database User
CREATE USER menna WITH PASSWORD '123';

Create Database
CREATE DATABASE store;

Grant Privileges to User
GRANT ALL PRIVILEGES ON DATABASE store TO menna;

Users Table:
/* create table users */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);
/* drop users table */
DROP TABLE users;

Categories Table:
/* create category table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE categories(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
/* drop categories table */
DROP TABLE categories;

Products Table:
/* create product table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  category_id uuid NOT NULL,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories (id)
);
/* drop products table */
DROP TABLE products;

Orders Table:
/* create order table */
-- uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE status_type AS ENUM ('active', 'complete');
CREATE TABLE orders(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  status status_type NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT fk_user_order FOREIGN KEY (user_id) REFERENCES users (id)
);
/* drop orders table */
DROP TABLE orders;

order_products Table:
/* create order_product table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity INTEGER,
  order_id uuid NOT NULL,
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id),
  product_id uuid NOT NULL,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products (id)
);
/* drop order_products table */
DROP TABLE order_products;

//// Environments
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store
POSTGRES_DB_TEST=''
POSTGRES_USER=menna
POSTGRES_PASSWORD=123
BCRYPT_PASSWORD=menna-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=menna-secret-token

//// Verbs
- Get ==> get
- Create ==> post
- Update ==> patch
- Delete ==> delete
- Auth ==> post

//// End Points
Base URL:
$ http://localhost:3000

// Users
- Get All Users:
$ http://localhost:3000/api/user
Verb: Get
- Get User By Id:
$ http://localhost:3000/api/user/:id
Verb: Get
- Create New User:
$ http://localhost:3000/api/user
Verb: Post
- Update User:
$ http://localhost:3000/api/user/:id
Verb: Patch
Authorization: Token
- Delete User By Id:
$ http://localhost:3000/api/user/:id
Verb: Delete
- Login:
$ http://localhost:3000/api/user/login
Verb: Post

// Category
- Get All Categories:
$ http://localhost:3000/api/category
Verb: Get
- Get category By Id:
$ http://localhost:3000/api/category/:id
Verb: Get
- Create New category:
$ http://localhost:3000/api/category
Verb: Post
Authorization: Token
- Update category:
$ http://localhost:3000/api/category/:id
Verb: Patch
Authorization: Token
- Delete category By Id:
$ http://localhost:3000/api/category/:id
Verb: Delete
Authorization: Token

// Product
- Get All Products:
$ http://localhost:3000/api/product
Verb: Get
- Get product By Id:
$ http://localhost:3000/api/product/:id
Verb: Get
- Create New product:
$ http://localhost:3000/api/product
Verb: Post
Authorization: Token
- Update product:
$ http://localhost:3000/api/product/:id
Verb: Patch
Authorization: Token
- Delete product By Id:
$ http://localhost:3000/api/product/:id
Verb: Delete
Authorization: Token

// Order
- Get All Orders:
$ http://localhost:3000/api/order
Verb: Get
- Get order By Id:
$ http://localhost:3000/api/order/:id
Verb: Get
- Create New order:
$ http://localhost:3000/api/order
Verb: Post
Authorization: Token
- Update order:
$ http://localhost:3000/api/order/:id
Verb: Patch
Authorization: Token
- Delete order By Id:
$ http://localhost:3000/api/order/:id
Verb: Delete
Authorization: Token
- Add Product to order:
$ http://localhost:3000/api/order/:id/product
Verb: Post
Authorization: Token
- Get order Details:
$ http://localhost:3000/api/order/details/:id
Verb: Get
Authorization: Token

//// Postman
https://www.getpostman.com/collections/fa0a439cdf6be4b2b700