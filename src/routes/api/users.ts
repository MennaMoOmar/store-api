/***** imports *****/
import { Router } from 'express'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import authentication from '../../middlewares/authentication'
import User from '../../models/user'
import config from '../../config'

/***** variables *****/
const user = new User()

/***** Routes *****/
const userRoutes = Router()

/***** Api *****/
// get all users
userRoutes.get('/', authentication, async (_: Request, res: Response) => {
  try {
    const users = await user.getAllUsers()
    res.json({
      status: 200,
      data: users,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// get one user by id
userRoutes.get('/:id', authentication, async (req: Request, res: Response) => {
  try {
    const selectedUser = await user.getUserById(req.params.id)
    res.json({
      status: 200,
      data: selectedUser,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// create new user
userRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await user.createNewUser(req.body)
    res.json({
      status: 200,
      data: newUser,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// update user
userRoutes.patch(
  '/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const updatedUser = await user.updateUserById(req.body)
      res.json({
        status: 200,
        data: updatedUser,
        message: 'success',
      })
    } catch (err) {
      res.json({
        status: 404,
        message: `failed, ${(err as Error).message}`,
      })
    }
  }
)

// delete user by id
userRoutes.delete(
  '/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const deletedUser = await user.deleteUserById(req.params.id)
      res.json({
        status: 200,
        data: deletedUser,
        message: 'success',
      })
    } catch (err) {
      res.json({
        status: 404,
        message: `failed, ${(err as Error).message}`,
      })
    }
  }
)

// login
userRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const loginUser = await user.login(email, password)
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string)
    if (!user) {
      return res.json({
        status: 401,
        message: 'wrong username or password',
      })
    } else {
      res.json({
        status: 200,
        data: { ...loginUser, token },
        message: 'success',
      })
    }
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

export default userRoutes
