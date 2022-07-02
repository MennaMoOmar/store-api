/***** imports *****/
import { Router } from 'express'
import usersRoutes from './api/users'
import categoriesRoutes from './api/categories'
import productsRoutes from './api/products'
import ordersRoutes from './api/orders'

/***** variables *****/
const routes = Router()

routes.use('/user', usersRoutes)
routes.use('/category', categoriesRoutes)
routes.use('/product', productsRoutes)
routes.use('/order', ordersRoutes)

export default routes
