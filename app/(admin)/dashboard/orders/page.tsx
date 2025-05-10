import { getAllOrders } from "@/actions/getAllOrders";
import { Heading } from "@/components/Heading";
import { OrderColumns } from "@/components/columns/order-column";
import { DataTable } from "@/components/common/data-table";
import { Separator } from "@/components/ui/separator";

const OrdersAdminPage = async () => {
	const orders = await getAllOrders();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<Heading
					title={`Orders (${orders?.length})`}
					description="Manage Orders for your store"
				/>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<DataTable
				columns={OrderColumns}
				//@ts-ignore
				data={orders}
				searchKey="orderNumber"
			/>
		</div>
	);
};

export default OrdersAdminPage;
