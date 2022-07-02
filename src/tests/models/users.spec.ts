/***** imports *****/
import UserModel from '../../models/user'
import UserType from '../../types/user'
import db from '../../database'

/***** variables *****/
const userModel = new UserModel()

/***** test cases *****/

// Test User Model
describe('Test User Model', () => {
  // test method defination
  describe('test method defination', () => {
    it('Get All Users', () => {
      expect(userModel.getAllUsers).toBeDefined()
    })

    it('Get Get User By Id', () => {
      expect(userModel.getUserById).toBeDefined()
    })

    it('Create New User', () => {
      expect(userModel.createNewUser).toBeDefined()
    })

    it('Update User By Id', () => {
      expect(userModel.updateUserById).toBeDefined()
    })

    it('Delete User By Id', () => {
      expect(userModel.deleteUserById).toBeDefined()
    })

    it('Login', () => {
      expect(userModel.login).toBeDefined()
    })
  })

  //   test functionality
  describe('test functionality', () => {
    const user = {
      email: 'menna-test@gmail.com',
      password: '123',
      first_name: 'menna',
      last_name: 'omar',
    } as UserType

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

    it('Create New User', async () => {
      const createdUser = await userModel.createNewUser({
        email: 'menna-test2@gmail.com',
        password: '123',
        first_name: 'menna',
        last_name: 'omar',
      } as UserType)
      expect(createdUser.id).toEqual(createdUser.id)
    })

    it('Authenticate User', async () => {
      const authenticatedUser = await userModel.login(
        user.email as string,
        user.password as string
      )
      expect(authenticatedUser?.email).toBe(user.email)
      expect(authenticatedUser?.first_name).toBe(user.first_name)
      expect(authenticatedUser?.last_name).toBe(user.last_name)
    })

    it('Unauthenticate User', async () => {
      const authenticatedUser = await userModel.login(
        'menna-test@gmail.com',
        'wrong-password'
      )
      expect(authenticatedUser).toBe(null)
    })

    it('Get All Users', async () => {
      const users = await userModel.getAllUsers()
      expect(users.length).toBe(2)
    })

    it('Get User By Id', async () => {
      const returnedUser = await userModel.getUserById(user.id as string)
      expect(returnedUser.id).toBe(user.id)
      expect(returnedUser.email).toBe(user.email)
      expect(returnedUser.user_name).toBe(user.user_name)
      expect(returnedUser.first_name).toBe(user.first_name)
    })

    it('Update User By Id', async () => {
      const updatedUser = await userModel.updateUserById({
        ...user,
        first_name: 'mennaaa',
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
      expect(updatedUser.first_name).toBe('mennaaa')
      expect(updatedUser.last_name).toBe(user.last_name)
    })

    it('Delete User By Id', async () => {
      const deletedUser = await userModel.deleteUserById(user.id as string)
      expect(deletedUser.id).toBe(user.id)
    })
  })
})
