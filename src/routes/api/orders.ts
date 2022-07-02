/***** imports *****/
import { Router } from 'express'
import { Request, Response } from 'express'

import authentication from '../../middlewares/authentication'
import Order from '../../models/order'

/***** variables *****/
const order = new Order()

/***** Routes *****/
const orderRoutes = Router()

/***** Api *****/
// get all orders
orderRoutes.get('/', authentication, async (_: Request, res: Response) => {
  try {
    const orders = await order.getAllOrders()
    res.json({
      status: 200,
      data: orders,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// get order by id
orderRoutes.get('/:id', authentication, async (req: Request, res: Response) => {
  try {
    const selectedOrder = await order.getOrderById(req.params.id)
    res.json({
      status: 200,
      data: selectedOrder,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// create new order
orderRoutes.post('/', authentication, async (req: Request, res: Response) => {
  try {
    const newOrder = await order.createNewOrder(req.body)
    res.json({
      status: 200,
      data: newOrder,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// update order
orderRoutes.patch(
  '/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const updatedOrder = await order.updateOrderById(req.body)
      res.json({
        status: 200,
        data: updatedOrder,
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

// delete order by id
orderRoutes.delete(
  '/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const deletedOrder = await order.deleteOrderById(req.params.id)
      res.json({
        status: 200,
        data: deletedOrder,
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

// add product to order
orderRoutes.post(
  '/:id/product',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const prroductAddtedToOrder = await order.addProductToOrder(
        req.params.id,
        req.body
      )
      res.json({
        status: 200,
        data: prroductAddtedToOrder,
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

// getProductsInOrder
orderRoutes.get(
  '/details/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const productsInOrder = await order.getProductsInOrder(req.params.id)
      res.json({
        status: 200,
        data: productsInOrder,
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

export default orderRoutes
