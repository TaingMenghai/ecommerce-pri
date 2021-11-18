import express from "express"
import {
	getProductById,
	getProducts,
	deleteProduct,
	updateProduct,
	createProduct,
} from "../controllers/productController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

//* Fetch all products
router.route("/").get(getProducts).post(protect, admin, createProduct)

//* Fetch product
router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)

export default router
