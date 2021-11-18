import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
	productListReducer,
	productDetailReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
} from "./reducers/productReducer"
import { cartReducer } from "./reducers/cartReducer"
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from "./reducers/userReducer"
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderListMyReducer,
	orderPayReducer,
} from "./reducers/orderReducer"

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
})

const cartItemFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: []

const userInfoFromStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {}

const initialState = {
	cart: {
		cartItems: cartItemFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
