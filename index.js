import express from "express"
import routerApi from "./routes/index.js"
import { errorHandler, logErrors, boomErrorHandler } from "./middlewares/error.handler.js"
import cors from "cors"

const app = express()
app.use(express.json())
const port = 3000

const whitelist = ['http://localhost:8080']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(options))

app.get("/", (req, res) => {
  res.send('Hola mi server en express')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})