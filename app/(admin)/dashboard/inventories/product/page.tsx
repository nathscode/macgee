import { getAllProducts } from "@/actions/getAllProducts";
import { Heading } from "@/components/Heading";
import { ProductColumns } from "@/components/columns/product-column";
import { DataTable } from "@/components/common/data-table";
import GeneralButton from "@/components/common/general-button";
import { Separator } from "@/components/ui/separator";
import { HiPlus } from "react-icons/hi2";

type Props = {};

const ProductListPage = async (props: Props) => {
	const products = await getAllProducts();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<Heading
					title={`Products (${products?.length})`}
					description="Manage products for your store"
				/>
				<GeneralButton link="/dashboard/inventories/product/new">
					<HiPlus className="w-6 h-6" />
					Add Product
				</GeneralButton>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<div className="mt-5">
				<div className="container mx-auto py-10">
					<DataTable
						columns={ProductColumns}
						//@ts-ignore
						data={products}
						searchKey="Title"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductListPage;
