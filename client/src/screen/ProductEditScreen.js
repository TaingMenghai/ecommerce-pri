import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import Message from "../components/Message"

import { listProductDetail, updateProduct } from "../actions/productAction"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant"
import axios from "axios"

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id

	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState("")
	const [brand, setBrand] = useState("")
	const [category, setCategory] = useState("")
	const [description, setDescription] = useState("")
	const [countInStock, setCountInStock] = useState(0)
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	const productDetail = useSelector((state) => state.productDetail)
	const { product, loading, error } = productDetail

	const productUpdate = useSelector((state) => state.productUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	useEffect(() => {
		// if user doesn't exist or id doesn't match url
		if (!product.name || product._id !== productId) {
			dispatch(listProductDetail(productId))
		} else {
			setName(product.name)
			setPrice(product.price)
			setImage(product.image)
			setBrand(product.brand)
			setCategory(product.category)
			setCountInStock(product.countInStock)
			setDescription(product.description)
		}
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			history.push("/admin/productlist")
		}
	}, [dispatch, product, productId, history, successUpdate])

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append("image", file)
		setUploading(true)

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}

			const { data } = await axios.post("/api/upload", formData, config)

			setImage(data)
			setUploading(false)
		} catch (error) {
			console.error(error)
			setUploading(false)
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		)
	}
	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light'>
				go back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='email' className='mb-3'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='price' className='mb-3'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.Group
								controlId='formFile'
								onChange={uploadFileHandler}
								className='mb-3'
							>
								<Form.Control type='file' />
							</Form.Group>
							{uploading && <Loader />}
						</Form.Group>
						<Form.Group controlId='brand' className='mb-3'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='countInStock' className='mb-3'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter countInStock'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='category' className='mb-3'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='description' className='mb-3'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Edit
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
