import axios from "axios"
import { ORDER_LIST_MY_RESET } from "../constants/orderConstant"
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	USER_DETAILS_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstant"

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})

		const { data } = await axios({
			method: "POST",
			url: "/api/users/login",
			data: { email, password },
		})

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
		localStorage.setItem("user", JSON.stringify(data))
	} catch (err) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem("user")
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	dispatch({ type: ORDER_LIST_MY_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST })

	try {
		const { data } = await axios({
			method: "POST",
			url: "/api/users/signup",
			data: { name, email, password },
		})
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

		//* log user in right after register
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

		localStorage.setItem("user", JSON.stringify(data))
	} catch (err) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		})
	}
}

export const getUserDetails = (id) => async (dispatch, getState) => {
	//* id: profile, in route
	try {
		dispatch({ type: USER_DETAILS_REQUEST })

		//* get the logged in user
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/users/${id}`, config)

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
	} catch (err) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		})
	}
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(`/api/users/profile`, user, config)

		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
	} catch (err) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		})
	}
}
