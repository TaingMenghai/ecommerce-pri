import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getUserDetails, updateUser } from "../actions/userAction"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import Message from "../components/Message"

import { USER_UPDATE_RESET } from "../constants/userConstant"

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { user, loading, error } = userDetails

	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET })
			history.push("/admin/userlist")
		} else {
			// if user doesn't exist or id doesn't match url
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId))
			} else {
				setName(user.name)
				setEmail(user.email)
				setIsAdmin(user.isAdmin)
			}
		}
	}, [dispatch, user, userId, successUpdate, history])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
	}
	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light'>
				go back
			</Link>
			<FormContainer>
				<h1>Edit user</h1>
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
						<Form.Group controlId='email' className='mb-3'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='isadmin' className='mb-3'>
							<Form.Check
								type='checkbox'
								placeholder='Confirm password'
								label='Is Admin?'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
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

export default UserEditScreen
