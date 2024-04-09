import { Router } from "express";
import UsersService from "../services/userService.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { createUserSchema, getUserSchema, updateUserSchema } from "../schemas/user.schema.js";

const router = Router()
const serviceUsers = new UsersService()

router.get('/', async (req, res, next) => {
  try {
    const users = await serviceUsers.getUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await serviceUsers.getOneUser(id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newUser = await serviceUsers.addUser(body)
    res.status(201).json({
      message: "created",
      data: newUser
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const user = await serviceUsers.updateOneUser(id, body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await serviceUsers.deleteOneUser(id)
    res.status(201).json({ id })
  } catch (error) {
    next(error)
  }
})

export default router