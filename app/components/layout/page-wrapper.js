import Accordion from "../accordion"
import Pager from "./pager"

function PageWrapper({ path, page, children }) {
	return (
		<>
			<Pager path={path} page={page} />
			{children}
			<Accordion />
		</>
	)
}

export default PageWrapper
