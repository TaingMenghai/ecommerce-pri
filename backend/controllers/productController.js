import asyncHandler from "express-async-handler"

import Product from "../models/productModel.js"

export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find()

	res.json({ products })
})

export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error("product not found")
	}
})

export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: "product removed" })
	} else {
		res.status(404)
		throw new Error("product not found")
	}
})

export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "images/mouse.jpg",
		brand: "simple brand",
		category: "simple category",
		countInStock: 0,
		numReviews: 0,
		description: "sample description",
	})
	const createdProduct = await product.save()
	res.json(createdProduct)
})

export const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, category, brand, image, description, countInStock } =
		req.body
	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.category = category
		product.brand = brand
		product.image = image
		product.countInStock = countInStock
		product.description = description

		const updatedProduct = await product.save()

		res.status(201).json(updatedProduct)
	} else {
		res.status(404)
		throw new Error("product not found")
	}
})
