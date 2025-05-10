import { getAllCustomers } from "@/actions/getAllCustomers";
import { Heading } from "@/components/Heading";
import { CustomerColumns } from "@/components/columns/customer-column";
import { DataTable } from "@/components/common/data-table";
import { Separator } from "@/components/ui/separator";

const CustomersAdminPage = async () => {
	const customers = await getAllCustomers();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<Heading
					title={`Customers (${customers?.length})`}
					description="Manage customers for your store"
				/>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<DataTable
				columns={CustomerColumns}
				//@ts-ignore
				data={customers}
				searchKey="id"
			/>
		</div>
	);
};

export default CustomersAdminPage;
