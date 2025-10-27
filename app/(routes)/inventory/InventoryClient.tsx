"use client";

import Container from "@/components/Container";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import PartCard from "@/components/cards/part-card";
import ProductCard from "@/components/cards/product-card";
import ProductSkeleton from "@/components/skeleton/product-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductWithOutUser } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlertCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ITEM_PER_PAGE = 16;

const fetchProducts = async (
	queryString: string,
	page: number,
	limit: number
) => {
	const url = queryString
		? `/api/product?q=${queryString}&page=${page}&limit=${limit}`
		: `/api/product?page=${page}&limit=${limit}`;

	const { data } = await axios.get<{
		products: ProductWithOutUser[];
		pagination: {
			totalCount: number;
			page: number;
			pageSize: number;
			totalPages: number;
		};
	}>(url);

	return data;
};

const InventoryClient = () => {
	const [filter, setFilter] = useState<string>("ALL");
	const searchParams = useSearchParams();
	const [queryString, setQueryString] = useState("");
	const [page, setPage] = useState<number>(1);
	const limit = ITEM_PER_PAGE;

	useEffect(() => {
		const query = searchParams.toString();
		setQueryString(query);
		setPage(1);
	}, [searchParams]);

	const {
		data: response,
		isPending,
		error,
		isFetching,
		isPlaceholderData,
	} = useQuery({
		queryKey: ["home-inventories", queryString, page],
		queryFn: () => fetchProducts(queryString, page, limit),
		placeholderData: keepPreviousData,
		enabled: true,
	});

	// Extract products and pagination metadata from response
	const products = response?.products || [];
	const pagination = response?.pagination;

	const productParts = products.filter(
		(product: ProductWithOutUser) => product.productType === "PART"
	);
	const productTrucks = products.filter(
		(product: ProductWithOutUser) => product.productType === "TRUCK"
	);

	const displayedInventoryTrucks = useMemo(() => {
		if (filter === "ALL") return productTrucks;
		return productTrucks.filter((item) => item.category === filter);
	}, [filter, productTrucks]);

	// Loading state
	if (isPending) {
		return (
			<div className="flex flex-col sm:flex-row justify-start max-w-sm gap-4 my-5">
				{Array.from({ length: limit }).map((_, i) => (
					<div key={i} className="flex flex-col w-full justify-start">
						<ProductSkeleton />
					</div>
				))}
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="flex flex-col justify-center items-center my-5">
				Error retrieving products
			</div>
		);
	}

	// No products state
	if (!products || products.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center my-5">
				No products found
			</div>
		);
	}

	return (
		<section className="inventory">
			<div className="content-wrapper">
				<div className="inventory__header">
					<h2>Our Equipments Listing</h2>
				</div>
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
							<ul className="flex flex-wrap gap-4 justify-start items-center w-full py-10">
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
				{/* @ts-ignore */}
				{pagination && pagination.hasNextPage && (
					<div className="flex items-center justify-center mt-10 mb-5">
						<Pagination
							currentPage={page}
							totalItems={pagination.totalCount}
							onPageChange={(page) => setPage(page)}
							isPreviousData={isPlaceholderData}
							itemPerPage={ITEM_PER_PAGE}
						/>

						{isFetching && <LoadingSpinner />}
					</div>
				)}
			</div>
		</section>
	);
};

export default InventoryClient;
