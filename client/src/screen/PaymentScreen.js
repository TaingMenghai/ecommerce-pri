import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { SavePaymentMethod } from "../actions/cartAction"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"

const PaymentScreen = ({ history }) => {
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)

	const { shippingAddress } = cart

	const [paymentMethod, setPaymentMethod] = useState("Paypal")

	if (!shippingAddress) {
		history.push("/shipping")
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(SavePaymentMethod(paymentMethod))
		history.push("/placeorder")
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>payment method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>select method</Form.Label>
					<Form.Check
						type='radio'
						label='Paypal'
						id='Paypal'
						name='paymentMethod'
						value='Paypal'
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					></Form.Check>
					<Form.Check
						type='radio'
						label='Stripe'
						id='Stripe'
						name='paymentMethod'
						value='Stripe'
						onChange={(e) => setPaymentMethod(e.target.value)}
					></Form.Check>
				</Form.Group>
				<Button type='submit' variant='primary' className='mt-3'>
					continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
