export const dynamic = "force-dynamic";
import PageWrapper from "@/components/layout/page-wrapper";
import Wrapper from "@/components/layout/wrapper";
import InventoryClient from "./InventoryClient";

const InventoryPage = async () => {
	return (
		<Wrapper>
			<PageWrapper page="Inventory" path="/inventory">
				<InventoryClient />
			</PageWrapper>
		</Wrapper>
	);
};

export default InventoryPage;
