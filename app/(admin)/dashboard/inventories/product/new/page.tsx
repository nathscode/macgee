import ProductForm from "@/components/forms/product-form";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartForm from "@/components/forms/part-form";

const NewProduct = () => {
	return (
		<div className="px-2 md:px-10 py-5">
			<div className="flex items-center justify-between">
				<p className="text-2xl md:text-3xl font-bold">New Product</p>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<div className="mx-auto sm:max-w-xl md:max-w-4xl">
				<div className="flex flex-col w-full">
					<Tabs defaultValue="truck" className="w-full">
						<TabsList className="flex w-fit">
							<TabsTrigger value="truck">Add Truck</TabsTrigger>
							<TabsTrigger value="part">Add Parts</TabsTrigger>
						</TabsList>
						<TabsContent value="truck">
							<ProductForm />
						</TabsContent>
						<TabsContent value="part">
							<PartForm />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default NewProduct;
