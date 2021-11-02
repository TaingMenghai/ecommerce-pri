import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"

import Message from "../components/Message"

import { addToCart } from "../actions/cartAction"
import { useEffect } from "react"

const CartScreen = ({ location, match, history }) => {
	const productId = match.params.id

	//location.search: query params
	const qty = location.search ? Number(location.search.split("=")[1]) : 1

	const dispatch = useDispatch()

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	return <div>cart screen</div>
}

export default CartScreen
