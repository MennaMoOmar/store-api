/***** imports *****/
import { Router } from 'express'
import { Request, Response } from 'express'

import authentication from '../../middlewares/authentication'
import Category from '../../models/category'

/***** variables *****/
const category = new Category()

/***** Routes *****/
const categoryRoutes = Router()

/***** Api *****/
// get all categories
categoryRoutes.get('/', async (_: Request, res: Response) => {
  try {
    const categories = await category.getAllCategories()
    res.json({
      status: 200,
      data: categories,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// get category by id
categoryRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const selectedCategory = await category.getCategoryById(req.params.id)
    res.json({
      status: 200,
      data: selectedCategory,
      message: 'success',
    })
  } catch (err) {
    res.json({
      status: 404,
      message: `failed, ${(err as Error).message}`,
    })
  }
})

// create new category
categoryRoutes.post(
  '/',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const newCategory = await category.createNewCategory(req.body)
      res.json({
        status: 200,
        data: newCategory,
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

// update category
categoryRoutes.patch(
  '/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const updatedCategory = await category.updateCategoryById(req.body)
      res.json({
        status: 200,
        data: updatedCategory,
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

// delete category by id
categoryRoutes.delete(
  '/:id',
  authentication,
  async (req: Request, res: Response) => {
    try {
      const deletedCategory = await category.deleteCategoryById(req.params.id)
      res.json({
        status: 200,
        data: deletedCategory,
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

export default categoryRoutes
