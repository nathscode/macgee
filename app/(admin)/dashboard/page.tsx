import { Separator } from "@/components/ui/separator";
import { RiToolsLine } from "react-icons/ri";
import { TbBulldozer } from "react-icons/tb";
import { db } from "@/config/db.config";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import GeneralButton from "@/components/common/general-button";

function formatCurrency(value: number | null | undefined) {
	if (!value) return "₦0.00";
	return `₦${value.toLocaleString("en-NG", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

export default async function DashboardPage() {
	const [totalSales, trucksCount, partsCount] = await Promise.all([
		db.order.aggregate({
			_sum: { totalAmount: true },
		}),
		db.product.count({
			where: { productType: "TRUCK" },
		}),
		db.product.count({
			where: { productType: "PART" },
		}),
	]);

	return (
		<div className="px-8 py-10">
			<p className="text-2xl md:text-3xl font-bold">Dashboard</p>
			<Separator className="bg-grey-1 my-5" />
			<div className="flex flex-col my-5 w-fit">
				<GeneralButton link="/dashboard/invoice">Create Invoice</GeneralButton>
			</div>
			<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{/* Total Sales */}
				<div className="p-6 border border-gray-200 rounded-xl">
					<div className="flex flex-col items-start space-x-4">
						<div className="flex flex-row items-center justify-between w-full pb-2 space-y-0">
							<h3 className="text-sm font-medium tracking-tight">
								Total Sales
							</h3>
							<div className="text-lg text-gray-600">₦</div>
						</div>
						<div>
							<div className="text-2xl font-bold">
								{formatPrice(totalSales._sum.totalAmount!.toString())}
							</div>
							<p className="text-xs text-gray-500">0.0% from last month</p>
						</div>
					</div>
				</div>

				{/* Total Trucks */}
				<div className="p-6 border border-gray-200 rounded-xl">
					<div className="flex flex-col items-start space-x-4">
						<div className="flex flex-row items-center justify-between w-full pb-2 space-y-0">
							<h3 className="text-sm font-medium tracking-tight">
								Total Trucks
							</h3>
							<TbBulldozer className="text-gray-500 w-7 h-7" />
						</div>
						<div>
							<div className="text-2xl font-bold">{trucksCount}</div>
							<p className="text-xs text-gray-500">brands</p>
						</div>
					</div>
				</div>

				{/* Total Parts */}
				<div className="p-6 border border-gray-200 rounded-xl">
					<div className="flex flex-col items-start space-x-4">
						<div className="flex flex-row items-center justify-between w-full pb-2 space-y-0">
							<h3 className="text-sm font-medium tracking-tight">
								Total Parts
							</h3>
							<RiToolsLine className="w-6 h-6 text-gray-500" />
						</div>
						<div>
							<div className="text-2xl font-bold">{partsCount}</div>
							<p className="text-xs text-gray-500">available</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
