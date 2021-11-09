import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const getUsers = asyncHandler(async (req, res) => {})

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		const { _id, name, email, isAdmin } = user
		res.json({
			_id,
			name,
			email,
			isAdmin,
		})
	} else {
		res.status(404)
		throw new Error("user not found")
	}
})
