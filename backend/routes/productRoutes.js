import express from "express"
import {
	getProductById,
	getProducts,
} from "../controllers/productController.js"

const router = express.Router()

//* Fetch all products
router.route("/").get(getProducts)

//* Fetch product
router.route("/:id").get(getProductById)

export default router
