import asyncHandler from "express-async-handler"

import Product from "../models/productModel.js"

export const getProducts = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword, // iph: still get iphone
					$options: "i", // 'case-insensitive': upper to lower
				},
		  }
		: {}

	const pageSize = 8 // num of products to display
	const page = Number(req.query.pageNumber) || 1 // num of page
	const count = await Product.countDocuments({ ...keyword }) // num of products in DB
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))
	// skip() method on a cursor to control where MongoDB begins returning results

	res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

export const createReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)

		if (alreadyReviewed) {
			res.status(400)
			throw new Error("product already reviewed!")
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment: comment,
			user: req.user._id,
		}

		product.reviews.push(review)

		product.numReviews = product.reviews.length

		product.rating =
			product.reviews.reduce((acc, item) => acc + item.rating, 0) /
			product.reviews.length

		await product.save()
		res.status(201).json({ message: "review added!" })
	} else {
		res.status(404)
		throw new Error("product not found")
	}
})
