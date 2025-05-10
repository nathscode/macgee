"use client";
import { doc, query, where, orderBy } from "firebase/firestore";
import { productsCollection } from "@/firebase/collections";
import { useDocument } from "@/hooks/useDocument";

import Container from "@/components/Container";
import { InventoryForm } from "./components/inventory-form";

const InventoryPage = ({ params }: { params: { inventoryId: string } }) => {
	const { data: productData, loading: productLoading } = useDocument(
		doc(productsCollection, params?.inventoryId as string),
		{ allowNull: false }
	);

	return (
		<Container>
			<div className="flex-col">
				<div className="flex-1 p-8 pt-6 space-y-4">
					{/* @ts-ignore */}
					<InventoryForm initialData={productData} />
				</div>
			</div>
		</Container>
	);
};

export default InventoryPage;
