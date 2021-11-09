import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { login } from "../actions/userAction"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import Message from "../components/Message"

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	// /login?redirect=shipping
	const redirect = location.search ? location.search.split("=")[1] : "/"

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)

	const { userInfo, loading, error } = userLogin

	useEffect(() => {
		// if the user already logged in push to shipping otherwise login page
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, redirect, userInfo])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>sign in</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email' className='mb-3'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password' className='mb-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					sign in
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					New Costumer?
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
