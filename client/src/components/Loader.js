import { Spinner } from "react-bootstrap"

const Loader = () => {
	return (
		<Spinner
			animation='border'
			variant='primary'
			style={{
				width: "100px",
				height: "100px",
				margin: "auto",
				display: "block",
			}}
		>
			<span className='sr-only'>loading...</span>
		</Spinner>
	)
}

export default Loader
