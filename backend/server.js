import express from "express"
import { config } from "dotenv"

import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errHandler, notFound } from "./middleware/errMiddleware.js"

config()

connectDB()

const app = express()

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

//* no route found
app.use(notFound)

//* global err middleware
// mongoose err send html but we want json
app.use(errHandler)

const port = process.env.PORT || 8000
app.listen(
	port,
	console.log(`server running in ${process.env.NODE_ENV} on port ${port}...`)
)
