import InventoriesHeader from "./_components/inventories-header";

const InventoryLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="relative">
			<InventoriesHeader />
			<div className="relative">{children}</div>
		</div>
	);
};
export default InventoryLayout;
