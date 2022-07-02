/***** imports *****/
import supertest from 'supertest'
import ProductType from '../../../types/product'
import CategoryModel from '../../../models/category'
import Category from '../../../types/category'
import app from '../../../index'
import db from '../../../database'

/***** variables *****/
const categoryModel = new CategoryModel()
const request = supertest(app)
let token = ''

/***** test cases *****/
describe('Product API Endpoints', () => {
  const category = {
    name: 'Electronics-test',
  } as Category

  const product = {
    name: 'product-test',
    price: 20000,
  } as ProductType

  beforeAll(async () => {
    const createdCategory = await categoryModel.createNewCategory(category)
    category.id = createdCategory.id
    product.category_id = category.id as string
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM products;'
    const sql2 = 'DELETE FROM categories;'
    const sql3 = 'DELETE FROM users;'
    await connection.query(sql)
    await connection.query(sql2)
    await connection.query(sql3)
    connection.release()
  })

  describe('Authenticate User', () => {
    it('Authenticate User', async () => {
      const res = await request
        .post('/api/user/login')
        .set('Content-type', 'application/json')
        .send({
          email: 'menna-test@gmail.com',
          password: '123',
        })
      expect(res.status).toBe(200)
      const { token: userToken } = res.body.data
      token = userToken
    })
  })

  describe('test API', () => {
    it('Create Product', async () => {
      const res = await request
        .post('/api/product')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...product,
          category_id: category.id,
        } as ProductType)
      product.id = res.body.data.id
      expect(res.status).toBe(200)
    })

    it('Get Many products', async () => {
      const res = await request
        .get('/api/product')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('Get Product By Id', async () => {
      const res = await request
        .get(`/api/product/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })

    it('Update Product', async () => {
      const res = await request
        .patch(`/api/product/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'product-testttt',
        } as ProductType)
      expect(res.status).toBe(200)
    })

    it('Delete Product', async () => {
      const res = await request
        .delete(`/api/product/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(product.id)
    })
  })
})
