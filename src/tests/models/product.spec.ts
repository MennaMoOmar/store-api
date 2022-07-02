/***** imports *****/
import ProductModel from '../../models/product'
import CategoryModel from '../../models/category'
import ProductType from '../../types/product'
import CategoryType from '../../types/category'
import db from '../../database'

/***** variables *****/
const productModel = new ProductModel()
const categoryModel = new CategoryModel()

/***** test cases *****/

// Test Product Model
describe('Test Product Model', () => {
  // test method defination
  describe('test method defination', () => {
    it('Get Many Products', () => {
      expect(productModel.getAllProducts).toBeDefined()
    })

    it('Get One Product', () => {
      expect(productModel.getProductById).toBeDefined()
    })

    it('Create Product', () => {
      expect(productModel.createNewProduct).toBeDefined()
    })

    it('Update Product', () => {
      expect(productModel.updateProductById).toBeDefined()
    })

    it('Delete Product', () => {
      expect(productModel.deleteProductById).toBeDefined()
    })
  })

  //   test functionality
  describe('testfunctionality', () => {
    const category = {
      name: 'Electronics-test',
    } as CategoryType

    const product = {
      name: 'product-test',
      price: 20000,
    } as ProductType

    beforeAll(async () => {
      const createdCategory = await categoryModel.createNewCategory(category)
      category.id = createdCategory.id
      product.category_id = category.id as string
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM products;'
      const sql2 = 'DELETE FROM categories;'
      await connection.query(sql)
      await connection.query(sql2)
      connection.release()
    })

    it('Create Product', async () => {
      const createdProduct = await productModel.createNewProduct({
        ...product,
      } as ProductType)
      product.id = createdProduct.id
      expect(createdProduct.id).toEqual(product.id)
    })

    it('Get Many Categories', async () => {
      const categories = await productModel.getAllProducts()
      expect(categories.length).toBe(1)
    })

    it('Get One Product', async () => {
      const returnedProduct = await productModel.getProductById(
        product.id as string
      )
      expect(returnedProduct.id).toBe(product.id)
      expect(returnedProduct.name).toBe(product.name)
      expect(returnedProduct.price).toBe(product.price)
      expect(returnedProduct.category_id).toBe(product.category_id)
    })

    it('Update Product', async () => {
      const updatedProduct = await productModel.updateProductById({
        ...product,
        name: 'product-test-edit',
      })
      expect(updatedProduct.id).toBe(product.id)
      expect(updatedProduct.name).toBe(updatedProduct.name)
      expect(updatedProduct.name).toBe('product-test-edit')
      expect(updatedProduct.price).toBe(updatedProduct.price)
      expect(updatedProduct.category_id).toBe(updatedProduct.category_id)
    })

    it('Delete Product', async () => {
      const deletedProduct = await productModel.deleteProductById(
        product.id as string
      )
      expect(deletedProduct.id).toBe(product.id)
    })
  })
})
