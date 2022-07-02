/***** imports *****/
import OrderModel from '../../models/order'
import OrderType from '../../types/order'
import ProductModel from '../../models/product'
import CategoryModel from '../../models/category'
import UserModel from '../../models/user'
import ProductType from '../../types/product'
import CategoryType from '../../types/category'
import UserType from '../../types/user'
import db from '../../database'

/***** variables *****/
const orderModel = new OrderModel()
const productModel = new ProductModel()
const categoryModel = new CategoryModel()
const userModel = new UserModel()

/***** test cases *****/

// Test Order Model
describe('Test Order Model', () => {
  // test methods defination
  describe('test methods defination', () => {
    it('Get Many Orders', () => {
      expect(orderModel.getAllOrders).toBeDefined()
    })

    it('Get One Orders', () => {
      expect(orderModel.getOrderById).toBeDefined()
    })

    it('Create Orders', () => {
      expect(orderModel.createNewOrder).toBeDefined()
    })

    it('Update Orders', () => {
      expect(orderModel.updateOrderById).toBeDefined()
    })

    it('Delete Orders', () => {
      expect(orderModel.deleteOrderById).toBeDefined()
    })
  })

  //   test functionality
  describe('test functionality', () => {
    const user = {
      email: 'menna@gmail.com',
      password: '123',
      first_name: 'menna',
      last_name: 'omar',
    } as UserType

    const category = {
      name: 'Electronics-test',
    } as CategoryType

    const product = {
      name: 'product-test',
      price: 20000,
    } as ProductType

    const order = {
      status: 'active',
    } as unknown as OrderType

    beforeAll(async () => {
      const createdCategory = await categoryModel.createNewCategory(category)
      category.id = createdCategory.id
      product.category_id = category.id as string
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM orders;'
      const sql2 = 'DELETE FROM products;'
      const sql3 = 'DELETE FROM categories;'
      const sql4 = 'DELETE FROM users;'
      await connection.query(sql)
      await connection.query(sql2)
      await connection.query(sql3)
      await connection.query(sql4)
      connection.release()
    })

    it('Create Order', async () => {
      const createdProduct = await productModel.createNewProduct({
        ...product,
      } as ProductType)
      product.id = createdProduct.id

      const createdUser = await userModel.createNewUser({
        ...user,
      } as UserType)
      user.id = createdUser.id

      const createdOrder = await orderModel.createNewOrder({
        ...order,
        user_id: user.id as string,
      } as unknown as OrderType)
      order.id = createdOrder.id

      expect(createdOrder.id).toEqual(order.id)
    })

    it('Get Many Orders', async () => {
      const orders = await orderModel.getAllOrders()
      expect(orders.length).toBe(1)
    })

    it('Get One Order', async () => {
      const returnedOrder = await orderModel.getOrderById(order.id as string)
      expect(returnedOrder.id).toBe(order.id)
    })

    it('Get Details For One Order', async () => {
      const returnedOrder = await orderModel.getProductsInOrder(
        order.id as string
      )
      expect(returnedOrder).not.toBeNull()
    })

    // it('Update Order', async () => {
    //   const updatedOrder = await orderModel.updateOrderById({
    //     ...order,
    //     // status: status_type.complete,
    //   })
    //   expect(updatedOrder.id).toBe(order.id)
    // })

    it('Delete Order', async () => {
      const deletedOrder = await orderModel.deleteOrderById(order.id as string)
      expect(deletedOrder.id).toBe(order.id)
    })
  })
})
