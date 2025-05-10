import getCurrentUser from "@/actions/getCurrentUser";
import { RoleType } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/config/db.config";
import { Metadata } from "next";
import ProductUploadForm from "@/components/forms/product-upload-form";
import fetchProductBySlug from "@/actions/fetchProductBySlug";

interface ProductUploadPageProps {
	params: {
		slug: string;
	};
}

export const metadata: Metadata = {
	title: "Upload Image Product",
};

const ProductUploadPage = async ({ params }: ProductUploadPageProps) => {
	const session = await getCurrentUser();

	let slug = decodeURIComponent(params.slug);
	const product = await fetchProductBySlug(slug);

	if (!session) {
		return redirect("/login");
	}

	if (!params.slug) {
		return redirect("/");
	}

	const isAdmin = session?.role === RoleType.ADMIN;
	const isAgent = session?.role === RoleType.MANAGER;
	const canListProduct = isAdmin || isAgent;

	if (product && canListProduct) {
		return <ProductUploadForm product={product} slug={slug} />;
	}

	return redirect("/");
};

export default ProductUploadPage;
