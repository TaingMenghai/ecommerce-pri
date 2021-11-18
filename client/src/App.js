import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Footer from "./components/Footer"
import Header from "./components/Header"
import CartScreen from "./screen/CartScreen"
import HomeScreen from "./screen/HomeScreen"
import LoginScreen from "./screen/LoginScreen"
import OrderScreen from "./screen/OrderScreen"
import PaymentScreen from "./screen/PaymentScreen"
import PlaceOrderScreen from "./screen/PlaceOrderScreen"
import ProductScreen from "./screen/ProductScreen"
import ProfileScreen from "./screen/ProfileScreen"
import RegisterScreen from "./screen/RegisterScreen"
import ShippingScreen from "./screen/ShippingScreen"

function App() {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Switch>
						<Route exact path='/order/:id' component={OrderScreen} />
						<Route exact path='/login' component={LoginScreen} />
						<Route exact path='/shipping' component={ShippingScreen} />
						<Route exact path='/payment' component={PaymentScreen} />
						<Route exact path='/placeorder' component={PlaceOrderScreen} />
						<Route exact path='/register' component={RegisterScreen} />
						<Route exact path='/profile' component={ProfileScreen} />
						<Route exact path='/' component={HomeScreen} />
						<Route exact path='/product/:id' component={ProductScreen} />
						<Route exact path='/cart/:id?' component={CartScreen} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
