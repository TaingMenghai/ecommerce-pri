import express from "express"
import {
	login,
	signup,
	updateUserProfile,
	getUserProfile,
	getUsers,
	deleteUser,
	updateUser,
	getUserById,
} from "../controllers/userController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

//* Fetch all users
router.route("/").post(signup).get(protect, admin, getUsers)

//* auth
router.post("/login", login)
// router.post("/signup", signup)

router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

//* Fetch user
router
	.route("/:id")
	.get(protect, admin, getUserById)
	.delete(protect, admin, deleteUser)
	.put(protect, admin, updateUser)

export default router
