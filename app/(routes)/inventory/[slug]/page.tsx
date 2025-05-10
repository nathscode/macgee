import React from "react";
import { Metadata } from "next";
import ProductClient from "../../product/_components/ProductClient";
import { fetchProductBySlug } from "@/actions/product.action";

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
	if (product.data?.medias && product.data?.medias.length > 0) {
		urlImage = product.data?.medias[0].url!;
	}
	return {
		title: product.data?.title,
		description: product.data?.description,
		openGraph: {
			title: product.data?.title,
			description:
				product.data?.description ??
				`${product.data?.title}-${product.data?.model}-${product.data?.year}`,
			url: `https://macgeeequipment.com/product/${product.data?.slug}`,
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
const InventoryDetailPage = ({ params }: { params: IParams }) => {
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

export default InventoryDetailPage;
