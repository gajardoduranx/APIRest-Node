import { Router } from "express"
import CategoryService from "../services/categoryService.js"
import validatorHandler from "../middlewares/validator.handler.js"
import { createCategorySchema, updateCategorySchema, getCategorySchema } from "../schemas/category.schema.js"

const router = Router()
const serviceCategory = new CategoryService()

router.get('/', async (req, res, next) => {
  try {
    const categories = await serviceCategory.getCategories()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await serviceCategory.getOneCategory(id)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createCategorySchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newCategory = await serviceCategory.addCategory(body)
    res.status(201).json({
      message: "created",
      data: newCategory
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(getCategorySchema, 'params'), validatorHandler(updateCategorySchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const category = await serviceCategory.updateOneCategory(id, body)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await serviceCategory.deleteOneCategory(id)
    res.status(201).json({ id })
  } catch (error) {
    next(error)
  }
})

export default router