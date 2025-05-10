import { getAllInventories } from "@/actions/getAllInventories";
import { Heading } from "@/components/Heading";
import { InventoryColumns } from "@/components/columns/inventory-column";
import { DataTable } from "@/components/common/data-table";
import GeneralButton from "@/components/common/general-button";
import { Separator } from "@/components/ui/separator";
import { HiPlus } from "react-icons/hi2";

const InventoryAdminPage = async () => {
	const inventories = await getAllInventories();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<Heading
					title={`Inventories (${inventories?.length})`}
					description="Manage inventories for your store"
				/>
				<GeneralButton link="/dashboard/inventories/product/new">
					<HiPlus className="w-6 h-6" />
					Add Product
				</GeneralButton>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<DataTable
				columns={InventoryColumns}
				//@ts-ignore
				data={inventories}
				searchKey="product"
			/>
		</div>
	);
};

export default InventoryAdminPage;
