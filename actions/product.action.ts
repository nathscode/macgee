"use server";

import { db } from "@/config/db.config";
import { ActionResponse, ProductWithOutUser } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export const getAllProducts = async (): Promise<
	ActionResponse<ProductWithOutUser[]>
> => {
	noStore();

	try {
		const products = await db.product.findMany({
			where: { isActive: true },
			orderBy: { createdAt: "desc" },
			take: 9,
			include: {
				medias: true,
			},
		});

		if (!products || products.length === 0) {
			return { message: "No products found", status: "error", data: [] };
		}

		const plainProducts = products.map((product) => ({
			...product,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt?.toISOString() || null,
			medias: product.medias.map((media) => ({
				...media,
				createdAt: media.createdAt.toISOString(),
			})),
		}));

		return {
			status: "success",
			data: JSON.parse(JSON.stringify(plainProducts)),
			message: "Products fetched successfully",
		};
	} catch (error) {
		console.error("[GET_PRODUCTS_ERROR]", error);
		return {
			message: "Error fetching products",
			status: "error",
			data: [],
		};
	}
};

export const fetchProductBySlug = async (
	slug: string
): Promise<ActionResponse<ProductWithOutUser | null>> => {
	noStore();
	if (!slug) {
		return { message: "Slug is required", status: "error", data: null };
	}

	try {
		const products = await db.product.findUnique({
			where: { slug: slug },
			include: {
				medias: true,
			},
		});

		if (!products) {
			return { message: "No products found", status: "error", data: null };
		}

		// **Sanitize User Data**
		const plainProduct = JSON.parse(JSON.stringify(products));
		return { status: "success", data: plainProduct };
	} catch (error) {
		console.error("[GET_PRODUCTS_ERROR]", error);
		return { message: "Error fetching products", status: "error", data: null };
	}
};
