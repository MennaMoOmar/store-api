/***** imports *****/
import db from '../database'
import Category from '../types/category'

/***** model *****/
class Categories {
  // create new category
  async createNewCategory(cat: Category): Promise<Category> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO categories (name)
      values ($1) returning *`
      const result = await connection.query(sql, [cat.name])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Error while creating category: ${(error as Error).message}`
      )
    }
  }

  // get all categories
  async getAllCategories(): Promise<Category[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * from categories'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(
        `Error while retrieving categories, ${(error as Error).message}`
      )
    }
  }

  // get one category by id
  async getCategoryById(id: string): Promise<Category> {
    try {
      const sql = `SELECT * FROM categories 
      WHERE id=($1)`
      const connection = await db.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Error while fetching category, ${(error as Error).message}`
      )
    }
  }

  // update category
  async updateCategoryById(cat: Category): Promise<Category> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE categories 
                  SET name=$2
                  WHERE id=$1
                  RETURNING *`

      const result = await connection.query(sql, [cat.id, cat.name])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Error while updating category, ${(error as Error).message}`
      )
    }
  }

  // delete category by id
  async deleteCategoryById(id: string): Promise<Category> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM categories 
                  WHERE id=($1) 
                  RETURNING *`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Error while deleting category, ${(error as Error).message}`
      )
    }
  }
}

export default Categories
