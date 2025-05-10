"use server";
import { db } from "@/config/db.config";
import { getLogger } from "@/lib/backend/logger";
import { OrderWithExtras } from "@/types";
import { unstable_noStore as noStore } from "next/cache";
const logger = getLogger();

export async function getAllOrders(): Promise<OrderWithExtras[] | null> {
	noStore();

	try {
		const orders = await db.order.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				orderItems: true,
				customer: true,
			},
		});

		if (!orders) return [];
		const plainOrders = JSON.parse(JSON.stringify(orders));
		return plainOrders;
	} catch (error) {
		logger.error("Database Error:", error);
		throw new Error("Failed to fetch orders");
	}
}
