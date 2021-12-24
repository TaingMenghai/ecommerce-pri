import { useState } from "react"

function useInputState(initVal) {
	const [val, setVal] = useState(initVal)

	const handleChange = (e) => {
		setVal(e.target.value)
	}

	const reset = () => {
		setVal(initVal)
	}
	return [val, handleChange, reset]
}

export default useInputState
