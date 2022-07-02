/***** imports *****/
import bcrypt from 'bcrypt'
import db from '../database'
import config from '../config'
import User from '../types/user'

/***** variables *****/
const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

/***** model *****/
class Users {
  // create new user
  async createNewUser(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (email, password, first_name, last_name)
      values ($1, $2, $3, $4) returning *`
      const result = await connection.query(sql, [
        u.email,
        hashPassword(u.password),
        u.first_name,
        u.last_name,
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while creating user: ${(error as Error).message}`)
    }
  }

  // get all users
  async getAllUsers(): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, email, first_name, last_name from users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error while fetching users ${(error as Error).message}`)
    }
  }

  // get one user by id
  async getUserById(id: string): Promise<User> {
    try {
      const sql = `SELECT id, email, first_name, last_name FROM users 
      WHERE id=($1)`
      const connection = await db.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could fetch user, ${(error as Error).message}`)
    }
  }

  // update user
  async updateUserById(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users 
                  SET email=$2,password=$3, first_name=$4, last_name=$5
                  WHERE id=$1
                  RETURNING id, email, first_name, last_name`

      const result = await connection.query(sql, [
        u.id,
        u.email,
        hashPassword(u.password),
        u.first_name,
        u.last_name,
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while updating user, ${(error as Error).message}`)
    }
  }

  // delete user by id
  async deleteUserById(id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM users 
                  WHERE id=($1) 
                  RETURNING id, email, first_name, last_name`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while deleting user, ${(error as Error).message}`)
    }
  }

  // login user
  async login(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT password FROM users WHERE email=$1'
      const result = await connection.query(sql, [email])

      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        )
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, email, first_name, last_name FROM users WHERE email=($1)',
            [email]
          )
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(`Error in login, ${(error as Error).message}`)
    }
  }
}

export default Users
