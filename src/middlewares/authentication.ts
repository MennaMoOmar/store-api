/***** imports *****/
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

// validate Token Middleware
const authentication = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // get authHeader
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        )
        if (decode) {
          next()
        } else {
          const error: Error = new Error('Error Login')
          next(error)
        }
      } else {
        const error: Error = new Error('Error Login')
        next(error)
      }
    } else {
      const error: Error = new Error('Error Login')
      next(error)
    }
  } catch (err) {
    const error: Error = new Error('Error Login')
    next(error)
  }
}

export default authentication
