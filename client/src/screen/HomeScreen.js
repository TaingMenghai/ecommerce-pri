import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row } from "react-bootstrap"
import Product from "../components/Product.js"
import { listProducts } from "../actions/productAction.js"
import Loader from "../components/Loader.js"
import Message from "../components/Message.js"

const HomeScreen = () => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)
	const { loading, products, error } = productList

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	return (
		<>
			<h1>latest products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map((p) => (
						<Col sm={12} md={6} lg={4} xl={3} key={p._id}>
							<Product product={p} />
						</Col>
					))}
				</Row>
			)}
		</>
	)
}

export default HomeScreen
