import { getAllOrders } from "@/actions/getAllOrders";
import { Heading } from "@/components/Heading";
import { OrderColumns } from "@/components/columns/order-column";
import { DataTable } from "@/components/common/data-table";
import InvoiceForm from "@/components/forms/invoice-form";
import { Separator } from "@/components/ui/separator";

const InvoiceAdminPage = async () => {
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">Create Invoice</div>
			<Separator className="bg-gray-200 my-4" />
			<InvoiceForm />
		</div>
	);
};

export default InvoiceAdminPage;
