"use client";

import { getAllProducts } from "@/actions/product.action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { AlertCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Container from "./Container";
import PartCard from "./cards/part-card";
import ProductCard from "./cards/product-card";
import ProductSkeleton from "./skeleton/product-skeleton";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import { ProductWithOutUser } from "@/types";

const Inventory = () => {
	const [filter, setFilter] = useState<string>("ALL");

	const {
		isPending,
		error,
		data: response,
	} = useQuery({
		queryKey: ["home-inventories"],
		queryFn: () => getAllProducts(),
	});

	// Memoize filtered products
	const { productParts, productTrucks, displayedInventoryTrucks } =
		useMemo(() => {
			if (!response?.data) {
				return {
					productParts: [],
					productTrucks: [],
					displayedInventoryTrucks: [],
				};
			}

			const products = response.data;
			const parts = products.filter(
				(product) => product.productType === "PART"
			);
			const trucks = products.filter(
				(product) => product.productType === "TRUCK"
			);
			const filteredTrucks =
				filter === "ALL"
					? trucks
					: trucks.filter((item) => item.category === filter);

			return {
				productParts: parts,
				productTrucks: trucks,
				displayedInventoryTrucks: filteredTrucks,
			};
		}, [response, filter]);

	if (isPending) {
		return (
			<div className="flex justify-center max-w-3xl lg:max-w-4xl mx-auto gap-4 my-5">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="flex flex-col w-full justify-start">
						<ProductSkeleton />
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
				<AlertCircleIcon className="w-12 h-12 text-red-400" />
				<p className="font-semibold text-sm text-red-400">
					Error loading products: {error.message}
				</p>
			</div>
		);
	}

	if (!response?.data || response.data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto py-20">
				<AlertCircleIcon className="w-12 h-12 text-gray-400" />
				<p className="font-semibold text-sm text-gray-400">
					No products available
				</p>
			</div>
		);
	}

	return (
		<section className="inventory">
			<div className="content-wrapper">
				<div className="inventory__header">
					<h2>Our Equipments Listing</h2>
					<p>
						Our machines are available in different sizes and shapes. When you
						need power and durability, our equipment is your best choice.
					</p>
				</div>
			</div>
			<div className="mx-auto content-wrapper">
				<Tabs defaultValue="trucks" className="w-full my-5">
					<TabsList className="flex justify-start items-center bg-transparent text-foreground w-full">
						<TabsTrigger value="trucks">Trucks</TabsTrigger>
						<TabsTrigger value="parts">Parts</TabsTrigger>
					</TabsList>
					<Container>
						<TabsContent value="trucks">
							<div className="category">
								<select
									value={filter}
									onChange={(e) => setFilter(e.target.value)}
									className="bg-background border rounded-md p-2"
								>
									<option value="ALL">All</option>
									<option value="EXCAVATOR">Excavators</option>
									<option value="DUMPER">Dumper</option>
									<option value="ROLLER">Roller</option>
									<option value="TRUCK">Truck</option>
									<option value="SLEEPER">Sleeper</option>
									<option value="LOADER">Wheel Loaders</option>
								</select>
							</div>
							<ul className="flex flex-wrap gap-4 justify-start items-center w-full">
								{displayedInventoryTrucks.length > 0 ? (
									displayedInventoryTrucks.map((inventory) => (
										<ProductCard key={inventory.id} inventory={inventory} />
									))
								) : (
									<div className="flex flex-col items-center justify-center min-h-14 h-[30vh]">
										<AlertCircleIcon className="w-12 h-12 text-gray-400" />
										<p className="text-gray-500">No items for this category</p>
									</div>
								)}
							</ul>
						</TabsContent>
						<TabsContent value="parts">
							<ul className="flex flex-wrap gap-4 justify-start items-center w-full  py-10">
								{productParts.length > 0 ? (
									productParts.map((inventory) => (
										<PartCard key={inventory.id} inventory={inventory} />
									))
								) : (
									<div className="flex flex-col items-center justify-center min-h-14 h-[30vh]">
										<AlertCircleIcon className="w-12 h-12 text-gray-400" />
										<p className="text-gray-500">No items for this category</p>
									</div>
								)}
							</ul>
						</TabsContent>
					</Container>
				</Tabs>
				<div className="flex flex-col justify-center items-center w-full mt-10">
					<Button
						variant={"outline"}
						className="px-10 font-medium hover:bg-brand hover:text-white"
						asChild
					>
						<Link href={"/inventory"}> View All </Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Inventory;
