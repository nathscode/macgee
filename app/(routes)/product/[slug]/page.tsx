import React from "react";
import ProductClient from "../_components/ProductClient";
import { Metadata } from "next";
import fetchProductBySlug from "@/actions/fetchProductBySlug";

interface IParams {
	slug?: string;
}

export const generateMetadata = async ({
	params,
}: {
	params: IParams;
}): Promise<Metadata> => {
	const product = await fetchProductBySlug(params.slug!);
	let urlImage = "";
	if (product?.medias && product.medias.length > 0) {
		urlImage = product.medias[0].url!;
	}
	return {
		title: product?.title,
		description: product?.description,
		openGraph: {
			title: product?.title,
			description:
				product?.description ??
				`${product?.title}-${product?.model}-${product?.year}`,
			url: `https://macgeeequipment.com/product/${product?.slug}`,
			siteName: "Macgeeequipment",
			images: [
				{
					url: urlImage,
					width: 1200,
					height: 600,
				},
			],
		},
	};
};
const ProductDetailPage = ({ params }: { params: IParams }) => {
	return (
		<div className="relative px-2 md:px-10 py-5">
			<div className="flex items-center justify-between">
				<p className="text-2xl md:text-3xl font-bold"></p>
			</div>
			<div className="mx-auto sm:max-w-xl md:max-w-4xl">
				<div className="flex flex-col w-full">
					<ProductClient slug={params.slug!} />
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
