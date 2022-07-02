/***** imports *****/
import db from '../database'
import Product from '../types/product'

/***** model *****/
class Products {
  // create new product
  async createNewProduct(cat: Product): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO products (name, price, category_id)
      values ($1, $2, $3) returning *`
      const result = await connection.query(sql, [
        cat.name,
        cat.price,
        cat.category_id,
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Error while creating product, ${(error as Error).message}`
      )
    }
  }

  // get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * from products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(
        `Error while fetching products, ${(error as Error).message}`
      )
    }
  }

  // get one product by id
  async getProductById(id: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM products 
      WHERE id=($1)`
      const connection = await db.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could fetch product}, ${(error as Error).message}`)
    }
  }

  // update product
  async updateProductById(prod: Product): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE products 
                  SET name=$2, price=$3, category_id=$4
                  WHERE id=$1
                  RETURNING *`
      const result = await connection.query(sql, [
        prod.id,
        prod.name,
        prod.price,
        prod.category_id,
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Error while updating product, ${(error as Error).message}`
      )
    }
  }

  // delete product by id
  async deleteProductById(id: string): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM products 
                  WHERE id=($1) 
                  RETURNING *`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Error while deleting product, ${(error as Error).message}`
      )
    }
  }
}

export default Products
