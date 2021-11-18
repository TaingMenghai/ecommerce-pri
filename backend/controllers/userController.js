import { json } from "express"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import { generateToken } from "../utils/generateToken.js"

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		const { _id, name, email, isAdmin } = user
		res.status(201).json({
			_id,
			name,
			email,
			isAdmin,
			token: generateToken(_id),
		})
	} else {
		res.status(401)
		throw new Error("invalid email or password")
	}
})

export const signup = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExist = await User.findOne({ email })

	if (userExist) {
		res.status(400)
		throw new Error("user already exist")
	}

	const user = await User.create({
		name,
		email,
		password,
	})

	if (user) {
		res
			.status(201)
			.json({ _id: user._id, name, email, token: generateToken(user._id) })
	} else {
		res.status(400)
		throw new Error("invalid user data")
	}
})

export const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		})
	} else {
		res.status(404)
		throw new Error("User not found")
	}
})

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

export const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password")

	res.json(users)
})

export const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: "user removed" })
	} else {
		res.status(404)
		throw new Error("user not found")
	}
})

export const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password")

	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error("user not found")
	}
})

export const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password")

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.isAdmin = req.body.isAdmin
		const updatedUser = await user.save()
		res.json(updatedUser)
	} else {
		res.status(404)
		throw new Error("user not found")
	}
})
