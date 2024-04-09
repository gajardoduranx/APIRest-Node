import { Router } from "express";
import ProductsService from "../services/productsService.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { createProductSchema, updateProductSchema, getProductSchema } from "../schemas/product.schema.js";

const router = Router()

const serviceProducts = new ProductsService()

router.get("/", async (req, res, next) => {
  try {
    const products = await serviceProducts.getProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await serviceProducts.getOneProduct(id)
    res.json(product)
  } catch(error) {
    next(error)
  }
})

router.post("/", validatorHandler(createProductSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newProduct = await serviceProducts.addProduct(body)
    res.status(201).json({
      message: "created",
      data: newProduct
    })
  } catch(error) {
    next(error)
  }
})
router.patch("/:id", validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const product = await serviceProducts.updateOneProduct(id, body)
  res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id',validatorHandler(getProductSchema, 'params') , async (req, res) => {
  try {
    const { id } = req.params
    await serviceProducts.deleteOneProduct(id)
    res.status(201).json({id})
  } catch(error){
    next(error)
  }
})

export default router