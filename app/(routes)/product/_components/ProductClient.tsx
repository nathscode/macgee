"use client";
import BackButton from "@/components/common/back-button";
import QuoteModal from "@/components/modals/QuoteModal";
import ProductCarousel from "@/components/product-carousel";
import { ContentSkeleton } from "@/components/skeleton/product-detail";
import { Button } from "@/components/ui/button";
import { ProductWithExtras } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
	slug: string;
};

interface FetchProductResponse {
	data: ProductWithExtras;
}

const fetchProductBySlug = (slug: string): Promise<FetchProductResponse> => {
	return axios
		.get(`/api/product/${slug}`)
		.then((response) => ({
			data: response.data,
		}))
		.catch((error) => {
			console.error(error);
			throw error;
		});
};

const ProductClient = ({ slug }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleClick = useCallback((e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.closest("[data-stop-propagation]")) return;
		e.preventDefault();
		setIsOpen(true);
	}, []);
	const {
		isPending,
		data: product,
		error,
	} = useQuery<FetchProductResponse, Error>({
		queryKey: ["product-detail", slug],
		queryFn: () => fetchProductBySlug(slug),
	});

	if (isPending) {
		return (
			<div className="flex flex-col sm:flex-row justify-start max-w-full gap-4 my-5">
				<div className="flex flex-col w-full justify-start">
					<ContentSkeleton />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col justify-center items-center my-5">
				Error retrieving Content Uploads
			</div>
		);
	}
	if (!product.data) {
		return (
			<div className="flex flex-col justify-center items-center my-5">
				No Product Found
			</div>
		);
	}

	const productDetails = `${product.data.title} - ${product.data.manufacturer}`;

	const msg = [
		`*Title: ${product.data.title}* *Model: ${product.data.model}* *Year: ${product.data.year}*`,
	];
	return (
		<>
			<div className="flex flex-col flex-1">
				<div className="flex items-center justify-between">
					<div className="justify-start">
						<h1 className="text-2xl md:text-3xl font-bold">
							{product.data.title}
						</h1>
						<BackButton />
					</div>
				</div>
				<div className="flex flex-wrap justify-between w-full">
					<div className="w-full md:w-1/2  md:pr-5 mb-5 md:mb-0">
						<ProductCarousel medias={product.data.medias} />
					</div>
					<div className="w-full md:w-1/2  md:pl-10 pl-0 mb-5 md:mb-0">
						<div className="flex flex-col flex-1">
							<div className="bg-[#EEEEEE] text-black font-semibold p-1 uppercase text-lg">
								description
							</div>
							<div>
								{product.data.description ? (
									<p>{product.data.description}</p>
								) : (
									<p>{`${product.data.title} - ${product.data.year} - ${product.data.model}`}</p>
								)}
							</div>
						</div>
						<div className="flex flex-col flex-1 my-4">
							<div className="bg-[#EEEEEE] text-black font-semibold p-1 uppercase text-lg">
								Specifications
							</div>
							<ul className="flex flex-col w-full space-y-3 mt-4">
								<li className="inline-flex justify-between w-full">
									<span className="font-semibold capitalize">manufacturer</span>
									<span>{product.data.manufacturer}</span>
								</li>
								<li className="inline-flex justify-between w-full">
									<span className="font-semibold capitalize">condition</span>
									<span>{product.data.condition}</span>
								</li>
								{product.data.productType === "TRUCK" ? (
									<>
										<li className="inline-flex justify-between w-full">
											<span className="font-semibold capitalize">year</span>
											<span>{product.data.year}</span>
										</li>
										<li className="inline-flex justify-between w-full">
											<span className="font-semibold capitalize">model</span>
											<span>{product.data.model}</span>
										</li>
										<li className="inline-flex justify-between w-full">
											<span className="font-semibold capitalize">hours</span>
											<span>
												{product.data.hours === 0 ? "nill" : product.data.hours}
											</span>
										</li>
										<li className="inline-flex justify-between w-full">
											<span className="font-semibold capitalize">Bucket</span>
											<span>
												{product.data.isBucket === false ? "nill" : "Yes"}
											</span>
										</li>
										<li className="inline-flex justify-between w-full">
											<span className="font-semibold capitalize">Exterior</span>
											<span>
												{product.data.isExterior === false ? "nill" : "Yes"}
											</span>
										</li>
										<li className="inline-flex justify-between w-full">
											<span className="font-semibold ">ROPS</span>
											<span>
												{product.data.isRops === false ? "nill" : "Yes"}
											</span>
										</li>
									</>
								) : null}
							</ul>
						</div>
						<div className="flex flex-col flex-1">
							<div className="bg-[#EEEEEE] text-black font-semibold p-1 uppercase text-lg">
								Contact
							</div>
							<div className="font-thin">
								<h4 className="font-normal mb-0">Address</h4>
								<p className="font-normal mt-2">
									Km 6, Osubi-airport road, Osubi, Delta state, Nigeria.
								</p>
								<div className="flex flex-col space-y-4 w-full">
									<Button onClick={handleClick} className="" variant={"brand"}>
										Request Quote
									</Button>

									<Button className="bg-[#25d366]" asChild>
										<Link
											href={`https://api.whatsapp.com//send?phone=+2347035846669&text=${encodeURIComponent(
												msg.join("\n")
											)}`}
											className="inline-flex items-center justify-center"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="w-6 h-6 mr-2"
												fill="currentColor"
											>
												<path fill="none" d="M0 0h24v24H0z"></path>
												<path d="M7.253 18.494l.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-8-8c0 1.436.377 2.813 1.084 4.024l.422.724-.653 2.401 2.4-.655zM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308c.134-.01.269-.01.403-.004.054.004.108.01.162.016.159.018.334.115.393.249.298.676.588 1.357.868 2.04.062.152.025.347-.093.537a4.38 4.38 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268.12.116.237.235.363.346.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.06.004.121.015.177.04.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265.004.067.01.175-.013.373-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302 2.378 2.378 0 0 1-.33.288 3.71 3.71 0 0 1-.125.09 5.024 5.024 0 0 1-.383.22 1.99 1.99 0 0 1-.833.23c-.185.01-.37.024-.556.014-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1z"></path>
											</svg>
											<span>Chat Us</span>
										</Link>
									</Button>
									<Button variant={"default"} asChild>
										<Link
											href="tel:+2347035846669"
											className="inline-flex items-center justify-center"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="w-6 h-6 mr-2"
												fill="currentColor"
											>
												<path fill="none" d="M0 0h24v24H0z"></path>
												<path d="M21 16.42v3.536a1 1 0 0 1-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07A1 1 0 0 1 4.044 3H7.58a.5.5 0 0 1 .498.45c.023.23.044.413.064.552A13.901 13.901 0 0 0 9.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.047 13.047 0 0 0 6.844 6.844l1.54-2.154a.462.462 0 0 1 .573-.149 13.901 13.901 0 0 0 4 1.205c.139.02.322.042.55.064a.5.5 0 0 1 .449.498z"></path>
											</svg>
											<span>Call us</span>
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<QuoteModal
				isOpen={isOpen}
				handleClose={handleClose}
				product={productDetails}
				productId={product.data.id}
			/>
		</>
	);
};

export default ProductClient;
