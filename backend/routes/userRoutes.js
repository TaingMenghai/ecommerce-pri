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

//* auth
router.post("/login", login)
router.post("/signup", signup)

//* for owner
router.use(protect)
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

//* for admin and protect
router.use(admin)
router.route("/").get(getUsers)
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser)

export default router
