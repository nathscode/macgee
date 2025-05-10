import fetchProductBySlug from "@/actions/fetchProductBySlug";
import getCurrentUser from "@/actions/getCurrentUser";
import NotFound from "@/app/not-found";
import ProductForm from "@/components/forms/product-form";
import { db } from "@/config/db.config";
import { RoleType } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface ProductUploadPageProps {
	params: {
		slug: string;
	};
}
export const metadata: Metadata = {
	title: "Edit Product",
};
const ProductEditPage = async ({ params }: ProductUploadPageProps) => {
	const session = await getCurrentUser();

	if (!session) {
		return redirect("/login");
	}

	if (!params.slug) {
		return redirect("/");
	}
	let slug = decodeURIComponent(params.slug);
	const existingProduct = await fetchProductBySlug(slug);

	if (!existingProduct) return <NotFound />;
	const isAdmin = session?.role === RoleType.ADMIN;
	const isManager = session?.role === RoleType.MANAGER;
	const canEditProduct = isAdmin || isManager;

	if (canEditProduct) {
		return (
			<div className="mx-auto sm:max-w-xl md:max-w-4xl">
				<div className="flex flex-col w-full">
					<ProductForm product={existingProduct} />;
				</div>
			</div>
		);
	}
};
export default ProductEditPage;
