/***** imports *****/
import supertest from 'supertest'
import app from '../../../index'
import UserModel from '../../../models/user'
import User from '../../../types/user'
import db from '../../../database'

/***** variables *****/
const userModel = new UserModel()
const request = supertest(app)
let token = ''

/***** test cases *****/
describe('User API Endpoints', () => {
  const user = {
    email: 'menna-test@gmail.com',
    password: '123',
    first_name: 'menna',
    last_name: 'omar',
  } as User

  beforeAll(async () => {
    const createdUser = await userModel.createNewUser(user)
    user.id = createdUser.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM users;'
    await connection.query(sql)
    connection.release()
  })

  describe('Login', () => {
    it('Authenticated User', async () => {
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
    it('Create User', async () => {
      const res = await request
        .post('/api/user/')
        .set('Content-type', 'application/json')
        .send({
          email: 'menna-test2@gmail.com',
          password: '123',
          first_name: 'menna',
          last_name: 'omar',
        } as User)
      expect(res.status).toBe(200)
    })

    it('Get Many Users', async () => {
      const res = await request
        .get('/api/user')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toEqual(2)
    })

    it('Get One User', async () => {
      const res = await request
        .get(`/api/user/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })

    it('Update User', async () => {
      const res = await request
        .patch(`/api/user/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          first_name: 'mennaaa',
          last_name: 'omar',
        })
      expect(res.status).toBe(200)
    })

    it('Delete User', async () => {
      const res = await request
        .delete(`/api/user/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
  })
})
