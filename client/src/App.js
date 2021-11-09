import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Footer from "./components/Footer"
import Header from "./components/Header"
import CartScreen from "./screen/CartScreen"
import HomeScreen from "./screen/HomeScreen"
import LoginScreen from "./screen/LoginScreen"
import ProductScreen from "./screen/ProductScreen"
import ProfileScreen from "./screen/ProfileScreen"
import RegisterScreen from "./screen/RegisterScreen"

function App() {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Switch>
						<Route exact path='/login' component={LoginScreen} />
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
