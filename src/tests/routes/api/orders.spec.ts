/***** imports *****/
import supertest from 'supertest'
import OrderType from '../../../types/order'
import ProductType from '../../../types/product'
import CategoryModel from '../../../models/category'
// import ProductModel from '../../../models/product'
import UserModel from '../../../models/user'
import Category from '../../../types/category'
import User from '../../../types/user'
import app from '../../../index'
import db from '../../../database'

/***** variables *****/
const categoryModel = new CategoryModel()
// const productModel = new ProductModel()
const userModel = new UserModel()
const request = supertest(app)
let token = ''

/***** test cases *****/
describe('Order API Endpoints', () => {
  const user = {
    email: 'menna-test2@gmail.com',
    password: '123',
    first_name: 'menna',
    last_name: 'omar',
  } as User

  const category = {
    name: 'Electronics-test',
  } as Category

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
    const sql = 'DELETE FROM order_products;'
    const sql2 = 'DELETE FROM orders;'
    const sql3 = 'DELETE FROM products;'
    const sql4 = 'DELETE FROM categories;'
    const sql5 = 'DELETE FROM users;'
    await connection.query(sql)
    await connection.query(sql2)
    await connection.query(sql3)
    await connection.query(sql4)
    await connection.query(sql5)
    connection.release()
  })

  describe('Authenticate User', () => {
    it('Authenticate User', async () => {
      const createdUser = await userModel.createNewUser(user)
      user.id = createdUser.id

      const res = await request
        .post('/api/user/login')
        .set('Content-type', 'application/json')
        .send({
          email: 'menna-test2@gmail.com',
          password: '123',
        })
      expect(res.status).toBe(200)
      const { token: userToken } = res.body.data
      token = userToken
      user.id = res.body.data.id
    })
  })

  describe('test API', () => {
    it('Create Order', async () => {
      const res = await request
        .post('/api/order')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...order,
          user_id: user.id,
        } as unknown as OrderType)
      order.id = res.body.data.id
      expect(res.status).toBe(200)
    })

    // it('Add Products To Order', async () => {
    //   const createdProduct = await productModel.createNewProduct({
    //     ...product,
    //   })
    //   product.id = createdProduct.id
    //   console.log(product.id)
    // const res = await request
    //   .post(`/api/order/${order.id}/product`)
    //   .set('Content-type', 'application/json')
    //   .set('Authorization', `Bearer ${token}`)
    //   .send([
    //     {
    //       product_id: product.id,
    //       quantity: 1,
    //     },
    //   ] as unknown as OrderType)
    // expect(res.status).toBe(200)
    // expect(res.body.data.length).toBe(1)
    // })

    it('Get All Order', async () => {
      const res = await request
        .get('/api/order')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('Get Order By Id', async () => {
      const res = await request
        .get(`/api/order/${order.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.status).toBe('active')
    })

    it('Update Order', async () => {
      const res = await request
        .patch(`/api/order/${order.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'complete',
        } as unknown as OrderType)
      expect(res.status).toBe(200)
    })

    // it('Delete Order', async () => {
    //   const res = await request
    //     .delete(`/api/order/${order.id}`)
    //     .set('Content-type', 'application/json')
    //     .set('Authorization', `Bearer ${token}`)
    //   expect(res.status).toBe(200)
    //   expect(res.body.data.id).toBe(order.id)
    // })
  })
})
