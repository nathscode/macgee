"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCartStore from "@/hooks/use-cart";
import { CartProduct, ProductWithExtras } from "@/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
	product: ProductWithExtras;
};

const PosProductListingCard = ({ product }: Props) => {
	const [quantity, setQuantity] = useState(1);
	const [productPrice, setProductPrice] = useState(0);
	const { toast } = useToast();
	const cart = useCartStore();

	const addItemToCart = () => {
		const result = cart.addItem({
			item: product,
			quantity,
			productPrice,
		});

		toast({
			description: (
				<div className="inline-flex justify-start">
					{/* @ts-ignore */}
					<span>{result.description}</span>
				</div>
			),
		});
	};

	const isInCart = cart.cartItems.some((item) => item.item.id === product.id);
	const isOutOfStock = product.currentStock === 0;
	const stockText = isOutOfStock
		? "Out of stock"
		: `${product.currentStock} in stock`;

	const productImage =
		product.medias?.length > 0
			? product.medias[0].url
			: "/placeholder-image.png";

	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex justify-start items-center space-x-4">
				<div className="h-12 w-12 shrink-0">
					<Image
						src={productImage!}
						alt="Product"
						className="object-cover rounded"
						width={48}
						height={48}
					/>
				</div>
				<div>
					<h2 className="text-sm font-semibold capitalize mb-1">
						{product.title}
					</h2>
					<p className="text-xs text-gray-600 mt-0">{`${
						product.category ? product.category : "PART"
					} - ${stockText}`}</p>
				</div>
			</div>
			<Button
				size="sm"
				variant="brand"
				disabled={isInCart || isOutOfStock}
				onClick={addItemToCart}
			>
				<Plus className="w-4 h-4" />
				<span className="pl-2">{isInCart ? "Added" : "Add"}</span>
			</Button>
		</div>
	);
};

export default PosProductListingCard;
