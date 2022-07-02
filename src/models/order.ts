/***** imports *****/
import db from '../database'
import Order_products from '../types/order_products'
import Order from '../types/order'

/***** model *****/
class OrderModel {
  // create new order
  async createNewOrder(o: Order): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO orders (status, user_id)
      values ($1, $2) returning *`
      const result = await connection.query(sql, [o.status, o.user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while creating order, ${(error as Error).message}`)
    }
  }

  // get all orders for all users
  async getAllOrders(): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * from orders'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(
        `Error while fetching orders, ${(error as Error).message}`
      )
    }
  }

  // get one order by id
  async getOrderById(id: string): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders
      WHERE id=($1)`
      const connection = await db.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Error while fetching order}, ${(error as Error).message}`
      )
    }
  }

  // update order by id
  async updateOrderById(o: Order): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE orders 
                  SET status=$2, user_id=$3
                  WHERE id=$1
                  RETURNING *`
      const result = await connection.query(sql, [o.id, o.status, o.user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not update order, ${(error as Error).message}`)
    }
  }

  // delete order by id
  async deleteOrderById(id: string): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM orders 
                  WHERE id=($1) 
                  RETURNING *`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while deleting order, ${(error as Error).message}`)
    }
  }

  // add product to order
  // async addProductToOrder(op: Order_products): Promise<Order> {
  //   try {
  //     const connection = await db.connect()
  //     const sql =
  //       'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
  //     const result = await connection.query(sql, [
  //       op.quantity,
  //       op.order_id,
  //       op.product_id,
  //     ])
  //     connection.release()
  //     return result.rows[0]
  //   } catch (error) {
  //     throw new Error(
  //       `Error while adding product to order, ${(error as Error).message}`
  //     )
  //   }
  // }

  async addProductToOrder(order_id: string, op: Order_products[]) {
    try {
      const connection = await db.connect()
      for (let i = 0; i < op.length; i++) {
        const sql =
          'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
        await connection.query(sql, [
          order_id,
          op[i].product_id,
          op[i].quantity,
        ])
      }
      connection.release()
    } catch (error) {
      throw new Error(
        `Error while adding product to order, ${(error as Error).message}`
      )
    }
  }

  // get all products in order y order id getProductsInOrder
  async getProductsInOrder(id: string): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders 
      INNER JOIN order_products ON orders.id = order_products.order_id
      INNER JOIN products ON products.id = order_products.product_id
      AND orders.id = ($1);`
      const connection = await db.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not find order, ${(error as Error).message}`)
    }
  }
}

export default OrderModel
