import Footer from "./footer"
import Header from "./header"

function Wrapper({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Wrapper
