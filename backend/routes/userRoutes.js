import express from "express"
import {
	login,
	signup,
	updateUserProfile,
} from "../controllers/authController.js"
import { getUserProfile } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

//* Fetch all users
// router.route("/").get(getProducts)

//* Fetch user
// router.route("/:id").get(getProductById)

//* auth
router.post("/login", login)
router.post("/signup", signup)

router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

export default router
