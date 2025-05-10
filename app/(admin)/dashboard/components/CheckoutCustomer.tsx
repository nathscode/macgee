"use client";
import getCustomerById from "@/actions/getCustomerById";
import LoadingButton from "@/components/common/loading-button";
import { useToast } from "@/components/ui/use-toast";
import useCartStore from "@/hooks/use-cart";
import { baseURL } from "@/lib/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const CheckoutCustomer = (props: Props) => {
	const { customerId, clearCart, cartItems, totalPrice, total, shippingFee } =
		useCartStore();
	const { toast } = useToast();
	const router = useRouter();

	// Fetch customer data
	const {
		isPending: customerLoading,
		error,
		data,
	} = useQuery({
		queryKey: ["customerId", customerId], // Include customerId in the query key
		queryFn: async () => await getCustomerById(customerId),
		retry: 1,
	});

	// Handle order submission
	const { mutate, isPending } = useMutation({
		mutationFn: async (FormData: FormData) => {
			const { data } = await axios.post(`/api/orders`, FormData);
			return data;
		},
		onSuccess: (data: any) => {
			router.push("/dashboard/orders");
			clearCart();
			return toast({
				description: "Order created successfully",
			});
		},
		onError: (err: any) => {
			const errorMessage =
				err.response?.data?.errors?.message || "Server error";
			return toast({
				description: `An error occurred ${errorMessage}`,
				variant: "destructive",
			});
		},
	});

	// Handle form submission
	function onSubmit() {
		const formData = new FormData();
		formData.append("customerId", customerId.toString());
		formData.append("total", total.toString());
		formData.append("payable", totalPrice.toString());
		formData.append("shippingFee", shippingFee.toString());
		formData.append("carts", JSON.stringify(cartItems || []));
		mutate(formData);
	}

	// Render loading or error states conditionally inside the component
	if (customerLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>An error occurred, Please Refresh and try again!</div>;
	}

	return (
		<div className="flex flex-col flex-1 w-full">
			<div className="flex flex-col">
				<h2 className="text-gray-600 font-semibold mb-3">The Customer</h2>
				<div className="flex flex-col flex-1 border p-3 rounded-md">
					<h4 className="capitalize text-lg my-2 pb-0">{data?.businessName}</h4>
					<p className="text-gray-500 mt-0">{`${data?.name} - ${data?.email}`}</p>
				</div>
			</div>
			<div className="flex flex-col my-3">
				<LoadingButton
					variant={"brand"}
					type="submit"
					loading={isPending}
					className="mt-6 w-full font-semibold"
					onClick={() => onSubmit()}
				>
					Confirm Checkout
				</LoadingButton>
			</div>
		</div>
	);
};

export default CheckoutCustomer;
