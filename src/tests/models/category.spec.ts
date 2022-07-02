/***** imports *****/
import CategoryModel from '../../models/category'
import CategoryType from '../../types/category'
import db from '../../database'

/***** variables *****/
const categoryModel = new CategoryModel()

/***** test cases *****/

// Test Category Model
describe('Test Category Model', () => {
  // test methods defination
  describe('test methods defination', () => {
    it('Get Many Categories', () => {
      expect(categoryModel.getAllCategories).toBeDefined()
    })

    it('Get One Category', () => {
      expect(categoryModel.getCategoryById).toBeDefined()
    })

    it('Create Category', () => {
      expect(categoryModel.createNewCategory).toBeDefined()
    })

    it('Update Category', () => {
      expect(categoryModel.updateCategoryById).toBeDefined()
    })

    it('Delete Category', () => {
      expect(categoryModel.deleteCategoryById).toBeDefined()
    })
  })

  //   test functionality
  describe('test functionality', () => {
    const category = {
      name: 'Electronics-test',
    } as CategoryType

    beforeAll(async () => {
      const createdCategory = await categoryModel.createNewCategory(category)
      category.id = createdCategory.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM categories;'
      await connection.query(sql)
      connection.release()
    })

    it('Create Category', async () => {
      const createdCategory = await categoryModel.createNewCategory({
        name: 'Electronics-test2',
      } as CategoryType)
      expect(createdCategory).toEqual({
        id: createdCategory.id,
        name: 'Electronics-test2',
      } as CategoryType)
    })

    it('Get Many Categories', async () => {
      const categories = await categoryModel.getAllCategories()
      expect(categories.length).toBe(2)
    })

    it('Get One Category', async () => {
      const returnedCategory = await categoryModel.getCategoryById(
        category.id as string
      )
      expect(returnedCategory.id).toBe(category.id)
      expect(returnedCategory.name).toBe(category.name)
    })

    it('Update Category', async () => {
      const updatedCategory = await categoryModel.updateCategoryById({
        ...category,
        name: 'Electronics-test-edit',
      })
      expect(updatedCategory.id).toBe(category.id)
      expect(updatedCategory.name).toBe(updatedCategory.name)
      expect(updatedCategory.name).toBe('Electronics-test-edit')
    })

    it('Delete Category', async () => {
      const deletedCategory = await categoryModel.deleteCategoryById(
        category.id as string
      )
      expect(deletedCategory.id).toBe(category.id)
    })
  })
})
