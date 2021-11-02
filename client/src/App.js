import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Footer from "./components/Footer"
import Header from "./components/Header"
import CartScreen from "./screen/CartScreen"
import HomeScreen from "./screen/HomeScreen"
import ProductScreen from "./screen/ProductScreen"

function App() {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route exact path='/' component={HomeScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
