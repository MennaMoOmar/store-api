/***** imports *****/
import { Router } from 'express'
import { Request, Response } from 'express'

import authentication from '../../middlewares/authentication'
import Product from '../../models/product'

/***** variables *****/
const product = new Product()

/***** Routes *****/
const productRoutes = Router()

/***** Api *****/
// get all products
productRoutes.get('/', async (_: Request, res: Response) => {
  try {
    const products = await product.getAllProducts()
    res.json({
      status: 200,
      data: products,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// get product by id
productRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const selectedProduct = await product.getProductById(req.params.id)
    res.json({
      status: 200,
      data: selectedProduct,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// create new product
productRoutes.post('/', authentication, async (req: Request, res: Response) => {
  try {
    const newProduct = await product.createNewProduct(req.body)
    res.json({
      status: 200,
      data: newProduct,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// update product
productRoutes.patch(
  '/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const updatedProduct = await product.updateProductById(req.body)
      res.json({
        status: 200,
        data: updatedProduct,
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

// delete product by id
productRoutes.delete(
  '/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const deletedProduct = await product.deleteProductById(req.params.id)
      res.json({
        status: 200,
        data: deletedProduct,
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

export default productRoutes
