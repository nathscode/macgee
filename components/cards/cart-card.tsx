"use client";
import { formatPrice } from "@/lib/utils";
import { CartProduct } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import placeholderImage from "/public/placeholder-image.png";
import useCartStore from "@/hooks/use-cart";
import { useState, useEffect } from "react";

type Props = {
	cartItem: CartProduct;
	quantity: number;
	productPrice: number;
};

const CartCard = ({ cartItem, quantity, productPrice }: Props) => {
	const [priceProduct, setPriceProduct] = useState<string>(
		String(productPrice)
	);

	const cart = useCartStore();
	const { toast } = useToast();

	function decreaseQuantity(product: CartProduct) {
		const result = cart.decreaseQuantity(cartItem.id);
		return toast({
			// @ts-ignore
			description: `${result.description}`,
		});
	}

	function increaseQuantity(product: CartProduct) {
		const result = cart.increaseQuantity(cartItem.id);
		return toast({
			// @ts-ignore
			description: `${result.description}`,
		});
	}

	function removeItem(product: CartProduct) {
		const result = cart.removeItem(cartItem.id);
		return toast({
			// @ts-ignore
			description: `${result.description}`,
		});
	}

	const handleInputPriceProductChange = (event: any) => {
		const value = event.target.value;
		const formatted = value
			.replace(/[^0-9.]/g, "")
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		setPriceProduct(formatted);
		const newPrice = parseFloat(value.replace(/,/g, ""));
		cart.setProductPrice(cartItem.id, newPrice);
	};

	// useEffect(() => {
	// 	setPriceProduct(productPrice); // Sync with cart item price if it changes
	// }, [cartItem.price]);

	const srcImage =
		cartItem.medias?.length > 0
			? cartItem.medias[0].url
			: "/placeholder-image.png";

	return (
		<div className="flex justify-start items-start w-full">
			<div className="relative shrink-0 w-[50px] sm:w-[80px] h-[65px] overflow-hidden bg-slate-300">
				<Image
					className="object-cover w-full h-full rounded-md"
					src={srcImage!}
					alt={cartItem.title}
					fill
				/>
			</div>
			<div className="flex flex-col ml-5 w-full">
				<Link
					href={`/product/${cartItem.slug}`}
					className="text-sm text-gray-800 font-semibold hover:text-brand uppercase line-clamp-2"
				>
					{cartItem.title}
				</Link>

				<div className="flex flex-1 justify-between items-center w-full mt-4">
					<div className="justify-start">
						<input
							type="text"
							id="price-input"
							className="bg-gray-50 border border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-auto py-2.5"
							value={priceProduct ?? productPrice}
							onChange={handleInputPriceProductChange}
							inputMode="numeric"
							required
						/>
					</div>
					<div className="justify-end">
						<div className="max-w-[400px] mx-auto">
							<div className="relative flex items-center max-w-[8rem]">
								<button
									type="button"
									id="decrement-button"
									className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-10 focus:ring-gray-100"
									onClick={() => decreaseQuantity(cartItem)}
								>
									<Minus className="w-4 h-4" />
								</button>
								<input
									type="text"
									id="quantity-input"
									className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
									value={quantity}
									readOnly
								/>
								<button
									type="button"
									id="increment-button"
									className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-10 focus:ring-gray-100"
									onClick={() => increaseQuantity(cartItem)}
								>
									<Plus className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full mt-2">
					<div className="justify-end">
						<div className="flex justify-start items-center w-full">
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:text-red-500"
								onClick={() => removeItem(cartItem)}
							>
								<Trash2 className="w-4 h-4 mr-2" />
								<span className="text-xs hidden sm:flex">Remove</span>
							</Button>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartCard;
