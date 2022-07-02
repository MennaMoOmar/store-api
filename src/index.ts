/* eslint-disable no-console */
/***** imports *****/
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import routes from './routes'
import config from './config'

/***** variables *****/
const PORT = config.port || 3000
const app: Application = express()

/***** middlewares *****/
// middleware to parse incoming requests
app.use(express.json())

// HTTP request logger middleware
app.use(morgan('common'))

// HTTP security middleware
app.use(helmet())

// Rate limit middleware
app.use(
  RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message:
      'Too many requests from this IP, please try again after an 15 minutes',
  })
)

/***** Routes *****/
// welcome route
app.get('/', (req: Request, res: Response) => {
  res.statusCode = 200
  res.json({
    status: 200,
    message: 'Welcome in Store API',
  })
})

// Main Route
app.use('/api', routes)

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Invalid URL',
  })
})

/***** listen server *****/
app.listen(PORT, () => {
  console.log(`Server running on prot:${PORT}`)
})

export default app
