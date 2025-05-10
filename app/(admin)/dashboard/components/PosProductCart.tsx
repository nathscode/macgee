"use client";
import CartCard from "@/components/cards/cart-card";
import { Button } from "@/components/ui/button";
import useCartStore, { CartItem } from "@/hooks/use-cart";
import { formatPrice, roundNumber } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const PosProductCart = (props: Props) => {
	const { clearCart, cartItems, total, setShippingFee, shippingFee } =
		useCartStore();
	const [feeShipping, setFeeShipping] = useState<string>(String(shippingFee));

	let subTotal = roundNumber(total);
	let totalRound = total + shippingFee;
	let grandTotal = roundNumber(totalRound);

	const handleInputShippingFeeProductChange = (event: any) => {
		const value = event.target.value;
		const formatted = value
			.replace(/[^0-9.]/g, "")
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		setFeeShipping(formatted);
		const newPrice = parseFloat(value.replace(/,/g, ""));
		setShippingFee(newPrice);
	};

	return (
		<div className="flex flex-1 flex-col w-full">
			{cartItems.length === 0 ? (
				<div className="flex flex-col justify-center">
					<p className="text-body-bold">No item in cart</p>
				</div>
			) : (
				<div className="flex flex-col w-full">
					<ul className="flex flex-col gap-y-10 w-full">
						{cartItems.map((cartItem: CartItem) => (
							<CartCard
								key={cartItem.item.slug}
								// @ts-ignore
								cartItem={cartItem.item}
								quantity={cartItem.quantity}
								productPrice={cartItem.productPrice}
							/>
						))}
					</ul>
					<div className="my-5 flex flex-col w-auto">
						<Button
							variant="default"
							className="uppercase w-fit inline-flex text-sm rounded-none font-semibold px-8 "
							onClick={() => clearCart()}
						>
							Clear Cart
						</Button>
					</div>
					{/* <div className="flex flex-col w-full">
						<ShippingSection />
					</div> */}
					<div className="flex flex-col w-full max-w-sm my-4">
						<h4 className="uppercase font-bold mt-5">Cart Total</h4>
						<ul className="flex flex-col my-2 space-y-0">
							<li className="inline-flex items-center justify-between w-full text-base">
								<strong className="text-zinc-500">Subtotal</strong>
								<span>{formatPrice(subTotal.toString())}</span>
							</li>

							<li className="inline-flex items-center justify-between w-full text-base ">
								<strong className="text-zinc-500">Shipping</strong>
								<div className="justify-start">
									<input
										type="text"
										id="price-input"
										className="bg-gray-50 border border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-auto py-2.5"
										value={feeShipping ?? shippingFee}
										onChange={handleInputShippingFeeProductChange}
										inputMode="numeric"
										required
									/>
								</div>
							</li>
							<li className="inline-flex items-center justify-between w-full text-base mt-4">
								<strong className="">Grand Total</strong>
								<strong className="font-bold">
									{formatPrice(grandTotal.toString())}
								</strong>
							</li>
						</ul>
					</div>
					<div className="flex flex-col mt-5">
						<Button
							variant="brand"
							className="uppercase inline-flex text-sm rounded-none font-semibold px-8 "
							asChild
						>
							<Link href={"/dashboard/pos/checkout"}>Proceed to checkout</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PosProductCart;
