"use server";
import { db } from "@/config/db.config";
import { getLogger } from "@/lib/backend/logger";
import { InventoryLogWithExtras } from "@/types";
import { unstable_noStore as noStore } from "next/cache";
const logger = getLogger();

export async function getAllInventories(): Promise<
	InventoryLogWithExtras[] | null
> {
	noStore();

	try {
		const inventories = await db.inventoryLog.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				product: true,
			},
		});

		if (!inventories) return [];
		const plainInventories = JSON.parse(JSON.stringify(inventories));
		return plainInventories;
	} catch (error) {
		logger.error("Database Error:", error);
		throw new Error("Failed to fetch orders");
	}
}
