"use client";
import Container from "@/components/Container";
import { Heading } from "@/components/Heading";
import { useRouter } from "next/navigation";
import { RiToolsLine } from "react-icons/ri";
import { TbBulldozer } from "react-icons/tb";

const DashboardPage = async () => {
	// @ts-ignore
	return (
		<Container>
			<div className="mt-10">
				<div
					id="stats"
					className="grid gap-6 gird-cols-1 md:grid-cols-2 lg:grid-cols-3"
				>
					<div className="p-6 border border-gray-200 rounded-xl">
						<div className="flex flex-col items-start space-x-4">
							<div className="flex flex-row items-center justify-between w-full pb-2 space-y-0">
								<h3 className="justify-start text-sm font-medium tracking-tight">
									Total Sales
								</h3>
								<div className="justify-end">
									<span>&#8358;</span>
								</div>
							</div>
							<div className="pt-0 !ml-0">
								<div className="text-2xl font-bold">0.00</div>
								<p className="text-xs text-gray-500">0.0% from last month</p>
							</div>
						</div>
					</div>
					<div className="p-6 border border-gray-200 rounded-xl">
						<div className="flex flex-col items-start space-x-4">
							<div className="flex flex-row items-center justify-between w-full pb-2 space-y-0">
								<h3 className="justify-start text-sm font-medium tracking-tight">
									Total Trucks
								</h3>
								<div className="justify-end">
									<TbBulldozer className="text-gray-500 w-7 h-7" />
								</div>
							</div>
							<div className="pt-0 !ml-0">
								<div className="text-2xl font-bold">{"50"}</div>
								<p className="text-xs text-gray-500">brands</p>
							</div>
						</div>
					</div>
					<div className="p-6 border border-gray-200 rounded-xl">
						<div className="flex flex-col items-start space-x-4">
							<div className="flex flex-row items-center justify-between w-full pb-2 space-y-0">
								<h3 className="justify-start text-sm font-medium tracking-tight">
									Total Parts
								</h3>
								<div className="justify-end">
									<RiToolsLine className="w-6 h-6 text-gray-500" />
								</div>
							</div>
							<div className="pt-0 !ml-0">
								<div className="text-2xl font-bold">0</div>
								<p className="text-xs text-gray-500">0</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full my-10">
					<Heading title="Inventory" description="Overview of your inventory" />
					{/* {isLoading ? (
						<Loading />
					) : !!error ? (
						<Error />
					) : data.length > 0 ? (
						<BasicTable data={data} />
					) : (
						<p>No Inventory</p>
					)} */}
				</div>
			</div>
		</Container>
	);
};

export default DashboardPage;
