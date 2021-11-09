import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import { getUserDetails, updateUserProfile } from "../actions/userAction"

import Loader from "../components/Loader"
import Message from "../components/Message"

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()
	const userDetails = useSelector((state) => state.userDetails)

	const { user, loading, error } = userDetails

	//* check is user logged in
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	useEffect(() => {
		// when manually access profile route, but not logged in will redirect to login page
		if (!userInfo) {
			history.push("/login")
		} else {
			// when first launch, user is empty then we dispatch to get userLogin
			if (!user || !user.name) {
				dispatch(getUserDetails("profile"))
			} else {
				// if user already logged in we set name to its name
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [history, userInfo, dispatch, user])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) return setMessage("password do not match")

		//* dispatch update profile
		dispatch(updateUserProfile({ id: user._id, name, email, password }))
	}
	return (
		<Row>
			<Col md={3}>
				<h2>user profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{success && <Message variant='success'>Profile updated</Message>}

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
						<Form.Group controlId='password' className='mb-3'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Confirm password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</Col>
			<Col md={9}>
				<h2>my order</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
