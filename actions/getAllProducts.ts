import { db } from "@/config/db.config";
import { ProductWithExtras, exclude } from "@/types";
import { User } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

export const getAllProducts = async (): Promise<ProductWithExtras[] | null> => {
	noStore();

	try {
		const products = await db.product.findMany({
			where: { isActive: true },
			orderBy: { createdAt: "desc" },
			include: {
				user: true,
				medias: true,
			},
		});

		if (!products) return [];
		const plainProducts = products.map((product) => {
			if (product.user !== null) {
				const userWithoutSensitiveFields = exclude<
					User,
					| "password"
					| "passwordResetAt"
					| "verificationCode"
					| "passwordResetToken"
					| "emailVerified"
				>(product.user, [
					"password",
					"passwordResetAt",
					"verificationCode",
					"passwordResetToken",
					"emailVerified",
				]);
				return { ...product, user: userWithoutSensitiveFields };
			}
			return product;
		});

		return JSON.parse(JSON.stringify(plainProducts));
	} catch (error) {
		console.log("[GET_PRODUCTS]", error);
		return [];
	}
};
