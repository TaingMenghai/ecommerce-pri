import { useEffect } from "react"
import { Card, Col, Image, ListGroup, Row, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { createOrder } from "../actions/orderAction"
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)

	cart.itemsPrice = cart.cartItems.reduce(
		(acc, item) => acc + item.qty * item.price,
		0
	)

	cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100
	cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
	cart.totalPrice = Number(
		(cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2)
	)

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error } = orderCreate

	console.log(order)
	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`)
		}
		//eslint-disable-next-line
	}, [history, success])

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		)
	}
	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city},
								{cart.shippingAddress.postalCode},{" "}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>
					</ListGroup>
					<ListGroup.Item>
						<h2>order items</h2>
						{cart.cartItems.length === 0 ? (
							<Message>your cart is empty</Message>
						) : (
							<ListGroup variant='flush'>
								{cart.cartItems.map((item) => (
									<ListGroup.Item key={item.product}>
										<Row>
											<Col md={1}>
												<Image src={item.image} alt={item.name} fluid rounded />
											</Col>
											<Col>
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</Col>
											<Col>
												{item.qty} x ${item.price} = ${item.qty * item.price}
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
						)}
					</ListGroup.Item>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* <ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item> */}
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
								<div className='d-grid'>
									<Button
										type='button'
										className='btn-block'
										disabled={cart.cartItems === 0}
										onClick={placeOrderHandler}
									>
										Place Order
									</Button>
								</div>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
