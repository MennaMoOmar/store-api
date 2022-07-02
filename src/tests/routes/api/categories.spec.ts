/***** imports *****/
import supertest from 'supertest'
import CategoryModel from '../../../models/category'
import Category from '../../../types/category'
import app from '../../../index'
import db from '../../../database'

/***** variables *****/
const categoryModel = new CategoryModel()
const request = supertest(app)
let token = ''

/***** test cases *****/
describe('Category API Endpoints', () => {
  const category = {
    name: 'Electronics-test',
  } as Category

  beforeAll(async () => {
    const createdCategory = await categoryModel.createNewCategory(category)
    category.id = createdCategory.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM users;'
    const sql2 = 'DELETE FROM categories;'
    await connection.query(sql)
    await connection.query(sql2)
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
    it('Create Category', async () => {
      const res = await request
        .post('/api/category')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'category-test',
        } as Category)
      expect(res.status).toBe(200)
    })

    it('Get Many Categories', async () => {
      const res = await request
        .get('/api/category')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('Get One Category', async () => {
      const res = await request
        .get(`/api/category/${category.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.name).toBe('Electronics-test')
    })

    it('Update Category', async () => {
      const res = await request
        .patch(`/api/category/${category.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'category-test2',
        } as Category)
      expect(res.status).toBe(200)
    })

    it('Delete Category', async () => {
      const res = await request
        .delete(`/api/category/${category.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(category.id)
    })
  })
})
