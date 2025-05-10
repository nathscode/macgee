"use server";
import { db } from "@/config/db.config";
import { getLogger } from "@/lib/backend/logger";
import { QuoteWithExtras } from "@/types";
import { unstable_noStore as noStore } from "next/cache";
const logger = getLogger();

export async function getAllQuotes(): Promise<QuoteWithExtras[] | null> {
	noStore();

	try {
		const quotes = await db.quote.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				product: true,
			},
		});

		if (!quotes) return [];
		const plainQuotes = JSON.parse(JSON.stringify(quotes));
		return plainQuotes;
	} catch (error) {
		logger.error("Database Error:", error);
		throw new Error("Failed to fetch quotez");
	}
}
