import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Alert,
	Form,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Message from "../components/Message"

import {
	createProductReview,
	listProductDetail,
} from "../actions/productAction"
import { PRODUCT_REVIEW_RESET } from "../constants/productConstant"

const ProductScreen = ({ history, match }) => {
	const productId = match.params.id
	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState("")

	const dispatch = useDispatch()

	const productDetail = useSelector((state) => state.productDetail)
	const { product, loading, error } = productDetail

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const productReviews = useSelector((state) => state.productReviews)
	const {
		loading: loadingProductReview,
		success: successProductReview,
		error: errorProductReview,
	} = productReviews

	useEffect(() => {
		if (successProductReview) {
			setRating(0)
			setComment("")
		}
		if (!product._id || product._id !== productId) {
			dispatch(listProductDetail(productId))
			dispatch({ type: PRODUCT_REVIEW_RESET })
		}
	}, [dispatch, productId, product, successProductReview])

	const addToCartHandler = () => {
		history.push(`/cart/${productId}?qty=${qty}`)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(createProductReview(productId, { rating, comment }))
	}

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Alert variant='danger'>
					<span>{error}</span>
				</Alert>
			) : (
				<>
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: {product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price: </Col>
											<Col>
												<strong>{product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status: </Col>
											<Col>
												<strong>
													{product.countInStock > 0
														? "In Stock"
														: "Out of Stock"}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Quantity: </Col>
												<Col>
													<Form.Select
														size='sm'
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Select>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<div className='d-grid'>
											<Button
												onClick={addToCartHandler}
												type='button'
												disabled={product.countInStock === 0}
											>
												add to cart
											</Button>
										</div>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{successProductReview && (
										<Message variant='success'>
											Review submitted successfully
										</Message>
									)}
									{loadingProductReview && <Loader />}
									{errorProductReview && (
										<Message variant='danger'>{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Select
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Select>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button
												disabled={loadingProductReview}
												type='submit'
												variant='primary'
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
