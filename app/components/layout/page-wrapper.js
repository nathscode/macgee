import Accordion from "../accordion"
import Pager from "./pager"
import Header from "../layout/header"

function PageWrapper({ path, page, children }) {
	return (
		<>
			<Header />
			<Pager path={path} page={page} />
			{children}
			<Accordion />
		</>
	)
}

export default PageWrapper
