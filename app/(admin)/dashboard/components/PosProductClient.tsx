"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductWithExtras } from "@/types";
import { ProductType } from "@prisma/client";
import { Filter } from "lucide-react";
import React from "react";
import PosProductListingCard from "./PosProductListingCard";

type Props = {
	products: ProductWithExtras[];
};

const PosProductClient = ({ products }: Props) => {
	const [searchKey, setSearchKey] = React.useState("");
	const [filterTruck, setFilterTruck] = React.useState(false);
	const [filterPart, setFilterPart] = React.useState(false);

	const filteredProducts = products.filter((product) => {
		const matchesSearchKey = product.title
			.toLowerCase()
			.includes(searchKey.toLowerCase());
		const matchesFilter =
			(filterTruck && product.productType === ProductType.TRUCK) ||
			(filterPart && product.productType === ProductType.PART);
		return matchesSearchKey && (matchesFilter || (!filterTruck && !filterPart));
	});

	return (
		<div className="flex flex-col justify-start w-full">
			<div className="flex flex-1 justify-between items-center space-x-2">
				<div className="justify-start">
					<Input
						placeholder="Search products..."
						value={searchKey}
						onChange={(event) => {
							setSearchKey(event.target.value);
						}}
						className="h-8 w-[150px] lg:w-[400px]"
					/>
				</div>
				<div className="justify-end">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="ml-auto hidden h-8 lg:flex"
							>
								<Filter className="h-5 w-5" />
								<span className="pl-2">Filter</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[150px]">
							<DropdownMenuCheckboxItem
								className="capitalize"
								checked={filterTruck}
								onCheckedChange={(value) => setFilterTruck(value)}
							>
								Truck
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem
								className="capitalize"
								checked={filterPart}
								onCheckedChange={(value) => setFilterPart(value)}
							>
								Part
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="flex flex-col w-full my-8 gap-2">
				<ScrollArea className="h-[400px] w-full">
					{filteredProducts && filteredProducts.length > 0 ? (
						filteredProducts.map((product, index) => (
							<PosProductListingCard
								key={`${product.id}-${index}`}
								product={product}
							/>
						))
					) : (
						<div className="flex flex-col w-full justify-center items-center">
							<p className="text-sm text-gray-500">No products found</p>
						</div>
					)}
				</ScrollArea>
			</div>
		</div>
	);
};

export default PosProductClient;
