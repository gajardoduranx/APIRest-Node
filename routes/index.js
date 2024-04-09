import { Router } from 'express'

import productsRouter from './productsRouter.js'
import usersRouter from './usersRouter.js'
import categoriesRouter from './categoriesRouter.js'
import ordersRouter from './ordersRouter.js'


function routerApi (app) {
  const router = Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
  router.use('/orders', ordersRouter)
}

export default routerApi