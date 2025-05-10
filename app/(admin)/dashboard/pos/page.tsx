import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import PosProductClient from "../components/PosProductClient";
import { getAllProducts } from "@/actions/getAllProducts";
import PosProductCart from "../components/PosProductCart";
import Link from "next/link";

const PosAdminPage = async () => {
	const products = await getAllProducts();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<Heading
					title={`POS`}
					description="Manage Point of sale for your store"
				/>
				<Button className="inline-flex">
					<Download className="w-5 h-5" />
					<span className="pl-2">Export</span>
				</Button>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<div className="flex flex-col mt-5 w-full border">
				<div className="flex flex-wrap justify-between w-full">
					<div className="w-full md:w-1/2  md:pr-5 mb-5 md:mb-0">
						<div className="flex flex-col w-full bg-slate-50 rounded-lg shadow-sm p-5">
							<PosProductClient products={products!} />
						</div>
					</div>
					<div className="w-full md:w-1/2  md:pr-5 mb-5 md:mb-0">
						<PosProductCart />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PosAdminPage;
