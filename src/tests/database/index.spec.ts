/***** imports *****/
import { Pool } from 'pg'
import config from '../../config'

// /***** test case *****/
describe('Test Database Connection', () => {
  it('success connect to database', async () => {
    const pool = new Pool({
      host: config.host,
      database: config.database,
      user: config.user,
      password: config.password,
      port: parseInt(config.dbPort as string, 10),
      max: 4,
    })

    pool.connect((_, connection) => {
      expect(connection).toBeNull
    })
  })

  it('failed connect to database', async () => {
    const pool = new Pool({
      host: config.host,
      database: 'wrong-db',
      user: config.user,
      password: config.password,
      port: parseInt(config.dbPort as string, 10),
      max: 4,
    })
    pool.connect((error) => {
      expect(error).toBeNull
    })
  })
})
